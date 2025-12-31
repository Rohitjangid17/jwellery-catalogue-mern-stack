// import "./src/config/env.config.js";

// import app from "./src/app.js";
// import connectDatabase from "./src/config/database.config.js";

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDatabase();

//      app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Server not started because DB failed");
//     // process.exit(1);
//   }
// };

// startServer();

// import app from "./src/app.js";

// export default app;

// index.js (root)
import "dotenv/config";
import app from "./src/app.js";
import connectDatabase from "./src/config/database.config.js";

// 1. Pre-connect to the database. 
// Vercel will keep this connection "warm" for subsequent requests.
connectDatabase()
  .then(() => console.log("Database initialized for Vercel"))
  .catch((err) => console.error("Database initialization failed:", err));

// 2. IMPORTANT: Vercel needs the default export of the Express app
export default app;

// 3. Only run the listener if NOT on Vercel (Local Development)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}
