// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import routes from "./routes/index.js";
// import path from "path";

// import { swaggerUi, swaggerSpec } from "./config/swagger.config.js";

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use("/uploads", express.static(path.resolve("uploads")));

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use(process.env.API_PREFIX, routes);

// app.get("/", (req, res) => {
//     try {
//         const now = new Date();

//         res.status(200).json({
//             status: true,
//             message: "Welcome to the Jeweller Catalogue API!",
//             api: "Jeweller Catalogue",
//             version: "1.0.0",
//             date: now.toLocaleDateString(),
//             time: now.toLocaleTimeString()
//         });
//     } catch (error) {
//         console.error("Error on root route:", error);
//         res.status(500).json({
//             status: false,
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// });


// export default app;

// import dotenv from "dotenv";
// dotenv.config(); // works locally, ignored on Vercel

// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import path from "path";

// import routes from "./routes/index.js";
// import connectDatabase from "./config/database.config.js";
// import { swaggerUi, swaggerSpec } from "./config/swagger.config.js";

// // 🔥 CONNECT DATABASE (cold start)
// await connectDatabase();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use("/uploads", express.static(path.resolve("uploads")));

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// console.log("API pre fix", process.env.API_PREFIX)
// app.use(process.env.API_PREFIX || "/api", routes);

// app.get("/", (req, res) => {
//   const now = new Date();
//   res.status(200).json({
//     status: true,
//     message: "Welcome to the Jeweller Catalogue API!",
//     api: "Jeweller Catalogue",
//     version: "1.0.0",
//     date: now.toLocaleDateString(),
//     time: now.toLocaleTimeString(),
//   });
// });

// export default app;


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
    message: "Welcome to the API",
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
  });
});

export default app;
    
