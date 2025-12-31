// import mongoose from "mongoose";

// // // disable buffering (VERY IMPORTANT)
// // mongoose.set("bufferCommands", false);

// const connectDatabase = async () => {
//   try {
//     console.log("db url ", process.env.DATABASE_URL)
//     await mongoose.connect(process.env.DATABASE_URL);

//     console.log("Database connected");
//   } catch (error) {
//     console.error("Database connection failed:", error.message);
//     throw error;
//   }
// };

// export default connectDatabase;
// import mongoose from "mongoose";

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const connectDatabase = async () => {
//   if (cached.conn) return cached.conn;

//   if (!process.env.DATABASE_URL) {
//     throw new Error("DATABASE_URL is missing");
//   }

//   console.log("db url ", process.env.DATABASE_URL)
//   cached.promise =
//     cached.promise ||
//     mongoose.connect(process.env.DATABASE_URL, {
//       bufferCommands: false,
//     });

//   cached.conn = await cached.promise;
//   console.log("Database connected");

//   return cached.conn;
// };

// export default connectDatabase;


import mongoose from "mongoose";

// Variable to cache the connection state
let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing in environment variables");
  }

  try {
    console.log("=> Connecting to new database instance...");
    const db = await mongoose.connect(process.env.DATABASE_URL, {
      // These options are recommended for stable serverless connections
      serverSelectionTimeoutMS: 5000, 
    });

    isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    // Don't use process.exit(1) in serverless; let the function handle the error
    throw error;
  }
};

export default connectDatabase;


