import express from "express";
import {
  createProduct,
  getProducts,
  updateProductById,
  deleteProductById,
} from "../controllers/product.controller.js";
import { productUpload } from "../middlewares/upload.middleware.js";

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
 *               - dimensions
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
 *               discount:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [flat, percent]
 *                     example: "percent"
 *                   amount:
 *                     type: number
 *                     example: 10
 *               sku:
 *                 type: string
 *                 example: "RING123"
 *               category:
 *                 type: string
 *                 example: "64c99e7fcf9cce1223f12aa1"
 *               weightInGrams:
 *                 type: number
 *                 example: 15
 *               metalType:
 *                 type: string
 *                 enum: [Gold, Silver, Platinum, Rose Gold, Other]
 *                 example: "Gold"
 *               gemstones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Diamond"
 *                     caratWeight:
 *                       type: number
 *                       example: 0.5
 *                     clarity:
 *                       type: string
 *                       example: "VS1"
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                       example: "M"
 *                     stockQuantity:
 *                       type: number
 *                       example: 10
 *                     priceModifier:
 *                       type: number
 *                       example: 100
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
 *               materials:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Alloy"
 *                     name:
 *                       type: string
 *                       example: "Gold"
 *                     percentage:
 *                       type: number
 *                       example: 75
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   lengthMm:
 *                     type: number
 *                     example: 50
 *                   widthMm:
 *                     type: number
 *                     example: 20
 *                   heightMm:
 *                     type: number
 *                     example: 10
 *                   diameterMm:
 *                     type: number
 *                     example: 18
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
router.post("/", productUpload.array("images", 5), createProduct);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 count:
 *                   type: number
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       basePrice:
 *                         type: number
 *                       discount:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                           amount:
 *                             type: number
 *                       sku:
 *                         type: string
 *                       category:
 *                         type: object
 *                       weightInGrams:
 *                         type: number
 *                       metalType:
 *                         type: string
 *                       gemstones:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             caratWeight:
 *                               type: number
 *                             clarity:
 *                               type: string
 *                       sizes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             size:
 *                               type: string
 *                             stockQuantity:
 *                               type: number
 *                             priceModifier:
 *                               type: number
 *                       colors:
 *                         type: array
 *                         items:
 *                           type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       materials:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             type:
 *                               type: string
 *                             name:
 *                               type: string
 *                             percentage:
 *                               type: number
 *                       dimensions:
 *                         type: object
 *                         properties:
 *                           lengthMm:
 *                             type: number
 *                           widthMm:
 *                             type: number
 *                           heightMm:
 *                             type: number
 *                           diameterMm:
 *                             type: number
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       rating:
 *                         type: number
 *                       stockStatus:
 *                         type: string
 *                       finalPrice:
 *                         type: number
 *                       reviews:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             userId:
 *                               type: string
 *                             rating:
 *                               type: number
 *                             comment:
 *                               type: string
 *                             createdAt:
 *                               type: string
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
 *               product_id:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               basePrice:
 *                 type: number
 *               discount:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                   amount:
 *                     type: number
 *               sku:
 *                 type: string
 *               category:
 *                 type: string
 *               weightInGrams:
 *                 type: number
 *               metalType:
 *                 type: string
 *               gemstones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     caratWeight:
 *                       type: number
 *                     clarity:
 *                       type: string
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                     stockQuantity:
 *                       type: number
 *                     priceModifier:
 *                       type: number
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               materials:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     name:
 *                       type: string
 *                     percentage:
 *                       type: number
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   lengthMm:
 *                     type: number
 *                   widthMm:
 *                     type: number
 *                   heightMm:
 *                     type: number
 *                   diameterMm:
 *                     type: number
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
router.put("/", productUpload.array("images", 5), updateProductById);

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
 *               - product_id
 *             properties:
 *               product_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/", deleteProductById);

export default router;
