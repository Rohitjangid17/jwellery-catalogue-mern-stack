import express from "express";
import { loginAdmin, loginCustomer, registerAdmin, registerCustomer } from "../controllers/auth.controller.js";

const router = express.Router();

// Customer Routes
router.post("/register/customer", registerCustomer);
router.post("/login/customer", loginCustomer);

// Admin Routes
router.post("/register/admin", registerAdmin); // requires ADMIN_SECRET in body
router.post("/login/admin", loginAdmin);

export default router;
