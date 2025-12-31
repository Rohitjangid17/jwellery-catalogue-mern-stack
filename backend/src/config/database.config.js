import mongoose from "mongoose";

let isConnected = false;

const connectDatabase = async () => {
    // 1. If already connected, return immediately
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // 2. If currently connecting, wait for it to finish
    if (mongoose.connection.readyState === 2) {
        console.log("Waiting for existing connection attempt...");
        return new Promise((resolve, reject) => {
            mongoose.connection.once("connected", () => resolve(mongoose.connection));
            mongoose.connection.once("error", (err) => reject(err));
        });
    }

    try {
        // Disable buffering to prevent the 10s hang
        mongoose.set('bufferCommands', false);

        console.log("Starting new database connection...");
        const db = await mongoose.connect(process.env.DATABASE_URL, {
            serverSelectionTimeoutMS: 5000,
            family: 4 // Forces IPv4, which is more stable on Vercel
        });

        isConnected = !!db.connections[0].readyState;
        return db;
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        throw error;
    }
};

export default connectDatabase;