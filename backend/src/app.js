import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import path from "path";
import { swaggerUi, swaggerSpec } from "./config/swagger.config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// NOTE: express.static often doesn't work for uploads on Vercel 
// because the file system is read-only. Use a cloud provider (Cloudinary/S3) for production.
app.use("/uploads", express.static(path.resolve("uploads")));

// API docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use API_PREFIX (like /api/v1)
app.use(process.env.API_PREFIX || "/api", routes);

// Root check
app.get("/", (req, res) => {
  const now = new Date();
  res.json({
    status: true,
    message: "Welcome to the Jeweller Catalogue API!",
    api: "Jeweller Catalogue",
    version: "1.0.0",
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
  });
});

export default app;
    
