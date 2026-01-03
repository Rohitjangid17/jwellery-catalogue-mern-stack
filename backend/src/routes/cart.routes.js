import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem
} from "../controllers/cart.controller.js"

const router = express.Router();

router.use(protect);

router.post("/", addToCart);
router.get("/", getCart);
router.put("/", updateCartItem);
router.delete("/", removeCartItem);
// router.delete("/", clearCart);

export default router;