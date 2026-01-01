import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { deleteUploadedFile } from "../utils/file/deleteFile.js";
import fs from "fs";
import path from "path";
import { parseFormData } from "../utils/parser/parseFormData.js";

const streamUpload = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        stream.end(fileBuffer);
    });
};

// Create Product
export const createProduct = async (req, res) => {
    try {
        const parsedBody = parseFormData(req.body);

        const {
            title,
            description,
            basePrice,
            discount,
            sku,
            category,
            weightInGrams,
            metalType,
            gemstones,
            sizes,
            colors,
            tags,
            materials,
            dimensions
        } = parsedBody;

        if (!title || !description || !basePrice || !sku || !category || !weightInGrams || !metalType || !dimensions) {
            req.files?.forEach(f => deleteUploadedFile(f.path));
            return res.status(400).json({ status: false, message: "Required fields are missing." });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ status: false, message: "At least one product image is required." });
        }

        const existing = await Product.findOne({ sku: sku.trim().toLowerCase() });
        if (existing) {
            req.files.forEach(f => deleteUploadedFile(f.path));
            return res.status(400).json({ status: false, message: "This SKU already exists." });
        }

        const imageUrls = [];
        if (process.env.NODE_ENV === "production") {
            for (const file of req.files) {
                const result = await streamUpload(file.buffer);
                imageUrls.push(result.secure_url);
            }
        } else {
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            for (const file of req.files) {
                imageUrls.push(`${baseUrl}/uploads/products/${file.filename}`);
            }
        }

        const product = new Product({
            title,
            description,
            basePrice,
            discount,
            sku: sku.trim().toLowerCase(),
            category,
            weightInGrams,
            metalType,
            gemstones,
            sizes,
            colors,
            tags,
            materials,
            dimensions,
            images: imageUrls
        });

        await product.save();

        res.status(201).json({ status: true, message: "Product created successfully." });

    } catch (error) {
        console.error("Create Product Error:", error);
        req.files?.forEach(f => fs.existsSync(f.path) && fs.unlinkSync(f.path));
        res.status(500).json({ status: false, message: "Server Error", error: error.message });
    }
};

// Get all or single product
export const getProducts = async (req, res) => {
    try {
        const { product_id, sort_by, category_id } = req.query;

        // get by product id
        if (product_id) {
            const product = await Product.findById(product_id).populate("category");
            if (!product) return res.status(404).json({ status: false, message: "Product not found" });
            return res.status(200).json({ status: true, product });
        }

        // get product by sort
        if (sort_by) {
            let sortQuery = {};
            switch (sort_by) {
                case "title_asc":
                    sortQuery = { title: 1 };
                    break;
                case "title_desc":
                    sortQuery = { title: -1 };
                    break;
                case "price_asc":
                    sortQuery = { basePrice: 1 };
                    break;
                case "price_desc":
                    sortQuery = { basePrice: -1 };
                    break;
                default:
                    sortQuery = {};
            }
            const products = await Product.find()
                .populate("category")
                .sort(sortQuery);

            return res.status(200).json({
                status: true,
                message: "Sorted products fetched successfully.",
                count: products.length,
                products,
            });
        }

        if (category_id) {
            const products = await Product.find({ category: category_id }).populate("category");
            if (!products.length)
                return res.status(404).json({ status: false, message: "No products found for this category" });

            return res.status(200).json({
                status: true,
                message: "Products fetched successfully by category.",
                count: products.length,
                products
            });
        }

        const products = await Product.find().populate("category");
        res.status(200).json({
            status: true,
            message: products.length ? "Products fetched successfully." : "No products found.",
            count: products.length,
            products
        });

    } catch (error) {
        console.error("Get Products Error:", error);
        res.status(500).json({ status: false, message: "Server Error", error: error.message });
    }
};

// Update Product
export const updateProductById = async (req, res) => {
    try {
        const { product_id } = req.query;
        const parsedBody = parseFormData ? parseFormData(req.body) : req.body;
        
        const { sku } = parsedBody;

        if (!product_id) return res.status(400).json({ status: false, message: "Product ID is required." });

        const product = await Product.findById(product_id);
        if (!product) return res.status(404).json({ status: false, message: "Product not found." });

        if (sku) {
            const existingSKU = await Product.findOne({ sku: sku.trim().toLowerCase() });
            if (existingSKU && existingSKU._id.toString() !== product_id) {
                if (process.env.NODE_ENV === "development") {
                    req.files?.forEach(f => deleteUploadedFile(f.path));
                }
                return res.status(400).json({ status: false, message: "SKU already in use." });
            }
        }

        if (req.files && req.files.length > 0) {
            for (const url of product.images) {
                if (process.env.NODE_ENV === "production") {
                    const publicId = url.split("/").slice(-2).join("/").split(".")[0];
                    await cloudinary.uploader.destroy(publicId).catch(err => console.error("Cloudinary Delete Error:", err));
                } else {
                    const filePath = path.join("uploads/products", path.basename(url));
                    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                }
            }

            const newUrls = [];
            if (process.env.NODE_ENV === "production") {
                const uploadPromises = req.files.map(file => streamUpload(file.buffer));
                const results = await Promise.all(uploadPromises);
                results.forEach(result => newUrls.push(result.secure_url));
            } else {
                const baseUrl = `${req.protocol}://${req.get("host")}`;
                req.files.forEach(file => {
                    newUrls.push(`${baseUrl}/uploads/products/${file.filename}`);
                });
            }

            product.images = newUrls;
        }

        Object.assign(product, {
            ...parsedBody,
            sku: sku ? sku.trim().toLowerCase() : product.sku
        });

        await product.save();

        res.status(200).json({
            status: true,
            message: "Product updated successfully.",
            product
        });

    } catch (error) {
        console.error("Update Product Error:", error);
        if (process.env.NODE_ENV === "development") {
            req.files?.forEach(f => fs.existsSync(f.path) && fs.unlinkSync(f.path));
        }
        res.status(500).json({ status: false, message: "Server Error", error: error.message });
    }
};

// Delete Product
export const deleteProductById = async (req, res) => {
    try {
        const { product_id } = req.query;
        if (!product_id) return res.status(400).json({ status: false, message: "Product ID is required." });

        const product = await Product.findById(product_id);
        if (!product) return res.status(404).json({ status: false, message: "Product not found." });

        if (process.env.NODE_ENV === "development") {
            product.images.forEach(img => {
                const filePath = path.join("uploads/products", path.basename(img));
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            });
        } else {
            for (const url of product.images) {
                const publicId = url.split("/").slice(-2).join("/").split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            }
        }

        await Product.findByIdAndDelete(product_id);
        res.status(200).json({ status: true, message: "Product deleted." });

    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({ status: false, message: "Server Error", error: error.message });
    }
};
