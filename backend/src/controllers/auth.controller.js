import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/auth/generateToken.js";
import bcrypt from "bcryptjs";

/**
 * @desc Register Customer User
 * @route POST /api/v1/auth/register/customer
 * @access Public
 */
export const registerCustomer = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    const user = await User.create({ name, email, password, role: "customer" });

    res.status(201).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        },
    });
});

/**
 * @desc Register Admin User
 * @route POST /api/v1/auth/register/admin
 */
export const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    // Create new admin
    const user = await User.create({ name, email, password, role: "admin" });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
    });
});

/**
 * @desc Login Customer User
 * @route POST /api/v1/auth/login/customer
 * @access Public
 */
export const loginCustomer = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password)) && user.role === "customer") {
        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            },
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid customer credentials' })
    }
});

/**
 * @desc Login Admin User
 * @route POST /api/v1/auth/login/admin
 * @access Public
 */
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password)) && user.role === "admin") {
        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            },
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid admin credentials' })
    }
});
