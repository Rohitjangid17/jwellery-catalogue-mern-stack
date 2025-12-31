import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { deleteUploadedFile } from "../utils/file/deleteFile.js";
// import connectDatabase from "../config";
import fs from "fs";
import path from "path";

// create category
export const createCategory = async (req, res) => {
    try {
        await connectDatabase();
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

        if (process.env.NODE_ENV === "development") {
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            imagePath = `${baseUrl}/uploads/categories/${req.file.filename}`;
        } else {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "categories",
            });
            imagePath = result.secure_url;
        }

        const category = new Category({ title, description, image: imagePath });
        await category.save();

        // fs.unlinkSync(req.file.path);

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
        await connectDatabase();
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
        await connectDatabase();
        const { category_id } = req.query;

        if (!category_id) {
            return res.status(400).json({ status: false, message: "Category ID is required" });
        }

        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }

        // delete image from local uploads or Cloudinary
        if (process.env.NODE_ENV === "development") {
            const imagePath = path.join("uploads", "categories", path.basename(category.image));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        } else {
            // extract public_id from the image URL
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
        await connectDatabase();
        const { category_id } = req.query;
        const { title, description } = req.body;

        // Validate category_id
        if (!category_id) {
            if (req.file) deleteUploadedFile(req.file.path);
            return res.status(400).json({ status: false, message: "Category ID is required" });
        }

        // Check if category exists
        const category = await Category.findById(category_id);
        if (!category) {
            if (req.file) deleteUploadedFile(req.file.path);
            return res.status(404).json({ status: false, message: "Category not found" });
        }

        // Validate title
        if (!title || title.trim() === "") {
            if (req.file) deleteUploadedFile(req.file.path);
            return res.status(400).json({ status: false, message: "Title is required." });
        }

        if (title.length > 50) {
            if (req.file) deleteUploadedFile(req.file.path);
            return res.status(400).json({ status: false, message: "Title must not exceed 50 characters." });
        }

        // Validate description
        if (!description || description.trim() === "") {
            if (req.file) deleteUploadedFile(req.file.path);
            return res.status(400).json({ status: false, message: "Description is required." });
        }

        if (description.length > 150) {
            if (req.file) deleteUploadedFile(req.file.path);
            return res.status(400).json({ status: false, message: "Description must not exceed 150 characters." });
        }

        // Validate image
        if (!req.file) {
            return res.status(400).json({ status: false, message: "Image is required." });
        }

        // Check for duplicate title
        const existingCategory = await Category.findOne({
            title: title.trim().toLowerCase(),
        });

        if (existingCategory && existingCategory._id.toString() !== category_id) {
            if (req.file) deleteUploadedFile(req.file.path);
            return res.status(400).json({ status: false, message: "This category already exists. Please try a different title." });
        }

        // Set updated values
        category.title = title.trim();
        category.description = description.trim();

        // Handle image update
        let newImagePath = "";

        if (process.env.NODE_ENV === "development") {
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            newImagePath = `${baseUrl}/uploads/categories/${req.file.filename}`;

            // Delete old image from uploads
            const oldPath = path.join("uploads", "categories", path.basename(category.image));
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

        } else {
            // Upload new image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "categories",
            });
            newImagePath = result.secure_url;

            // Delete old cloudinary image
            const oldImageUrlParts = category.image.split("/");
            const publicId = oldImageUrlParts.slice(-2).join("/").split(".")[0];
            await cloudinary.uploader.destroy(publicId);

            deleteUploadedFile(req.file.path);
        }

        category.image = newImagePath;
        await category.save();

        res.status(200).json({ status: true, message: "Category updated successfully." });
    } catch (error) {
        console.error("Error updating category:", error);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
}