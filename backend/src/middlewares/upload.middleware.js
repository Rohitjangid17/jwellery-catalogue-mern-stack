import multer from "multer";
import path from "path";
import fs from "fs";

// Storage logic depends on Environment
const storage = process.env.NODE_ENV === "production" 
    ? multer.memoryStorage() 
    : multer.diskStorage({
        destination: function (req, file, cb) {
            const dir = "uploads/categories";
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });

export const upload = multer({ storage });