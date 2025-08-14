import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: false,
            message: "Not authorized, no token",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info from token to request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Not authorized",
            error: error.message,
        });
    }
};
