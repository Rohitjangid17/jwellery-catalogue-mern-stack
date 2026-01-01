import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { deleteUploadedFile } from "../utils/file/deleteFile.js";
import fs from "fs";
import path from "path";

const streamUpload = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "categories" },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        stream.end(fileBuffer);
    });
};

// create category
export const createCategory = async (req, res) => {
    try {
        const { title, description } = req.body;

        // check title
        if (!title || title.trim() === "") {
            if (req.file) {
                deleteUploadedFile(req.file.path);
            }
            return res.status(400).json({ status: false, message: "Title is required." });
        }

        // check title length
        if (title.length > 50) {
            if (req.file) {
                deleteUploadedFile(req.file.path);
            }
            return res.status(400).json({ status: false, message: "Title must not exceed 50 characters." });
        }

        // check description
        if (!description || description.trim() === "") {
            if (req.file) {
                deleteUploadedFile(req.file.path);
            }
            return res.status(400).json({ status: false, message: "Description is required" });
        }

        if (description.length > 150) {
            if (req.file) {
                deleteUploadedFile(req.file.path);
            }
            return res.status(400).json({ status: false, message: "Description must not exceed 150 characters." });
        }

        // check image
        if (!req.file) {
            return res.status(400).json({ status: false, message: "Image is required." });
        }

        // Check for duplicate category
        const existingCategory = await Category.findOne({ title: title.trim().toLowerCase() });

        if (existingCategory) {
            if (req.file) {
                deleteUploadedFile(req.file.path);
            }
            return res.status(400).json({ status: false, message: "This category already exists. Please try a different title." });
        }

        let imagePath = "";

        if (process.env.NODE_ENV === "production") {
            const result = await streamUpload(req.file.buffer);
            imagePath = result.secure_url;
        } else {
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            imagePath = `${baseUrl}/uploads/categories/${req.file.filename}`;
        }

        const category = new Category({ title, description, image: imagePath });
        await category.save();

        res.status(201).json({ status: true, message: "Category created successfully!" });
    } catch (error) {
        console.error("Error creating category:", error);

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
}

// get category list or single category
export const getCategories = async (req, res) => {
    try {
        const { category_id } = req.query;

        if (category_id) {
            const category = await Category.findById(category_id);

            if (!category) {
                return res.status(404).json({ status: false, message: "Category not found" });
            }

            const productCount = await Product.countDocuments({ category: category_id });

            return res.status(200).json({
                status: true, message: "Category fetched successfully", category: {
                    ...category._doc, product_count: productCount,
                }
            });
        }

        const categories = await Category.find();

        const categoriesWithCount = await Promise.all(
            categories.map(async (category) => {
                const productCount = await Product.countDocuments({ category: category._id });

                return {
                    ...category._doc,
                    product_count: productCount,
                };
            })
        );

        res.status(200).json({
            status: true,
            message: categoriesWithCount.length > 0 ? "Categories fetched successfully." : "No categories found.",
            count: categoriesWithCount.length,
            categories: categoriesWithCount,
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
}

// delete category by id
export const deleteCategoryById = async (req, res) => {
    try {
        const { category_id } = req.query;

        if (!category_id) {
            return res.status(400).json({ status: false, message: "Category ID is required" });
        }

        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }

        if (process.env.NODE_ENV === "development") {
            const imagePath = path.join("uploads", "categories", path.basename(category.image));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        } else {
            const publicId = category.image.split("/").slice(-2).join("/").split(".")[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await Category.findByIdAndDelete(category_id);
        res.status(200).json({ status: true, message: "Category deleted successfully." });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
}

// update category by id
export const updateCategoryById = async (req, res) => {
    try {
        const { category_id } = req.query;
        const { title, description } = req.body;

        const category = await Category.findById(category_id);
        if (!category) {
            if (process.env.NODE_ENV !== "production" && req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ status: false, message: "Category not found" });
        }

        if (title) category.title = title.trim();
        if (description) category.description = description.trim();

        if (req.file) {
            let newImagePath = "";

            if (process.env.NODE_ENV === "production") {
                if (category.image && category.image.includes("cloudinary")) {
                    const publicId = category.image.split("/").slice(-2).join("/").split(".")[0];
                    await cloudinary.uploader.destroy(publicId);
                }

                const result = await streamUpload(req.file.buffer);
                newImagePath = result.secure_url;
            } else {
                const oldFileName = path.basename(category.image);
                const oldPath = path.join("uploads", "categories", oldFileName);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
                const baseUrl = `${req.protocol}://${req.get("host")}`;
                newImagePath = `${baseUrl}/uploads/categories/${req.file.filename}`;
            }

            category.image = newImagePath;
        }

        const duplicate = await Category.findOne({
            title: category.title.toLowerCase(),
            _id: { $ne: category_id }
        });

        if (duplicate) {
            return res.status(400).json({ status: false, message: "Another category already has this title." });
        }

        await category.save();

        res.status(200).json({
            status: true,
            message: "Category updated successfully!",
            category
        });

    } catch (error) {
        console.error("Update Error:", error);
        if (process.env.NODE_ENV !== "production" && req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
};