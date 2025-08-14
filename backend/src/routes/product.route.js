import express from "express";
import {
  createProduct,
  getProducts,
  updateProductById,
  deleteProductById,
} from "../controllers/product.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Product management
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - basePrice
 *               - sku
 *               - category
 *               - weightInGrams
 *               - metalType
 *               - colors
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Elegant Gold Ring"
 *               description:
 *                 type: string
 *                 example: "A beautiful handcrafted gold ring."
 *               basePrice:
 *                 type: number
 *                 example: 5000
 *               sku:
 *                 type: string
 *                 example: "RING123"
 *               category:
 *                 type: string
 *                 example: "64c99e7fcf9cce1223f12aa1"
 *               discount.type:
 *                 type: string
 *                 enum: [flat, percent]
 *                 example: "percent"
 *               discount.amount:
 *                 type: number
 *                 example: 10
 *               weightInGrams:
 *                 type: number
 *                 example: 15
 *               metalType:
 *                 type: string
 *                 enum: [Gold, Silver, Platinum, Rose Gold, Other]
 *                 example: "Gold"
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Red", "Blue"]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Ring", "Wedding"]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", upload.array("images", 5), createProduct);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products or a specific product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: product_id
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: List of products or a single product
 *       500:
 *         description: Internal server error
 */
router.get("/", getProducts);

/**
 * @swagger
 * /product:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "64c999abcde12345fgh67890"
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               basePrice:
 *                 type: number
 *               sku:
 *                 type: string
 *               category:
 *                 type: string
 *               weightInGrams:
 *                 type: number
 *               metalType:
 *                 type: string
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 */
router.put("/", upload.array("images", 5), updateProductById);

/**
 * @swagger
 * /product:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "64c999abcde12345fgh67890"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/", deleteProductById);

export default router;
