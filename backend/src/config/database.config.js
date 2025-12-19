import mongoose from "mongoose";

let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL);

    isConnected = true;
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    // DO NOT exit process in serverless
    throw error;
  }
};

export default connectDatabase;
    