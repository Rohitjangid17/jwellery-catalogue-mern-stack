import mongoose from "mongoose";

// // disable buffering (VERY IMPORTANT)
// mongoose.set("bufferCommands", false);

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
};

export default connectDatabase;
