import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { deleteUploadedFile } from "../utils/file/deleteFile.js";
import fs from "fs";
import path from "path";
import { parseFormData } from "../utils/parser/parseFormData.js";

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

        // Basic validations
        if (!title || !description || !basePrice || !sku || !category || !weightInGrams || !metalType || !dimensions) {
            req.files?.forEach(f => deleteUploadedFile(f.path));
            return res.status(400).json({ status: false, message: "Required fields are missing." });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ status: false, message: "At least one product image is required." });
        }

        // Duplicate SKU check
        const existing = await Product.findOne({ sku: sku.trim().toLowerCase() });
        if (existing) {
            req.files.forEach(f => deleteUploadedFile(f.path));
            return res.status(400).json({ status: false, message: "This SKU already exists." });
        }

        // Upload images
        const imageUrls = [];
        if (process.env.NODE_ENV === "development") {
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            req.files.forEach(file => {
                imageUrls.push(`${baseUrl}/uploads/products/${file.filename}`);
            });
        } else {
            for (const file of req.files) {
                const uploaded = await cloudinary.uploader.upload(file.path, { folder: "products" });
                imageUrls.push(uploaded.secure_url);
                deleteUploadedFile(file.path);
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
        const { product_id, sort_by } = req.query;
        if (product_id) {
            const product = await Product.findById(product_id).populate("category");
            if (!product) return res.status(404).json({ status: false, message: "Product not found" });
            return res.status(200).json({ status: true, product });
        }

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
                    sortQuery = { price: 1 };
                    break;
                case "price_desc":
                    sortQuery = { price: -1 };
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
        } = req.body;

        if (!product_id) return res.status(400).json({ status: false, message: "Product ID is required." });

        const product = await Product.findById(product_id);
        if (!product) return res.status(404).json({ status: false, message: "Product not found." });

        const existingSKU = await Product.findOne({ sku: sku.trim().toLowerCase() });
        if (existingSKU && existingSKU._id.toString() !== product_id) {
            req.files?.forEach(f => deleteUploadedFile(f.path));
            return res.status(400).json({ status: false, message: "SKU already in use." });
        }

        // Handle new images if uploaded
        if (req.files && req.files.length > 0) {
            if (process.env.NODE_ENV === "development") {
                for (const img of product.images) {
                    const filePath = path.join("uploads/products", path.basename(img));
                    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                }
            } else {
                for (const url of product.images) {
                    const publicId = url.split("/").slice(-2).join("/").split(".")[0];
                    await cloudinary.uploader.destroy(publicId);
                }
            }

            const newUrls = [];
            if (process.env.NODE_ENV === "development") {
                const baseUrl = `${req.protocol}://${req.get("host")}`;
                newUrls.push(...req.files.map(f => `${baseUrl}/uploads/products/${f.filename}`));
            } else {
                for (const file of req.files) {
                    const uploaded = await cloudinary.uploader.upload(file.path, { folder: "products" });
                    newUrls.push(uploaded.secure_url);
                    deleteUploadedFile(file.path);
                }
            }

            product.images = newUrls;
        }

        Object.assign(product, {
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
            dimensions
        });

        await product.save();

        res.status(200).json({
            status: true,
            message: "Product updated.",
        });

    } catch (error) {
        console.error("Update Product Error:", error);
        req.files?.forEach(f => fs.existsSync(f.path) && fs.unlinkSync(f.path));
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
