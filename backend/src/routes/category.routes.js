import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { createCategory, getCategories, deleteCategoryById, updateCategoryById } from "../controllers/category.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management APIs
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *                 example: Necklaces
 *               description:
 *                 type: string
 *                 example: Discover our exquisite collection of handcrafted necklaces made from high-quality materials, perfect for daily wear or special occasions.
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error or duplicate category
 *       500:
 *         description: Internal server error
 */
router.post("/", upload.single("image"), createCategory);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories or a single category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the category to fetch
 *     responses:
 *       200:
 *         description: Category/categories fetched successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get("/", getCategories);

/**
 * @swagger
 * /category:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Category ID is required
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete("/", deleteCategoryById);

/**
 * @swagger
 * /category:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *                 example: Necklaces
 *               description:
 *                 type: string
 *                 example: Discover our exquisite collection of handcrafted necklaces made from high-quality materials, perfect for daily wear or special occasions.
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.put("/", upload.single("image"), updateCategoryById);

export default router;
