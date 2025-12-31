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
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(process.env.DATABASE_URL, {
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  console.log("Database connected");

  return cached.conn;
};

export default connectDatabase;


