import multer from "multer";
import path from "path";
import fs from "fs";

/* ================= CATEGORY UPLOAD ================= */

const categoryStorage = process.env.NODE_ENV === "production"
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination(req, file, cb) {
            const dir = "uploads/categories";
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        },
        filename(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });

export const upload = multer({ storage: categoryStorage });

/* ================= PRODUCT UPLOAD ================= */

const productStorage = process.env.NODE_ENV === "production"
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination(req, file, cb) {
            const dir = "uploads/products";
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        },
        filename(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });

export const productUpload = multer({ storage: productStorage });
