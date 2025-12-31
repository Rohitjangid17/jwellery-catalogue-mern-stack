import mongoose from "mongoose";

let isConnected = false;

const connectDatabase = async () => {
    // 1. If already connected, return immediately
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // 2. If currently connecting, wait for the existing promise
    if (mongoose.connection.readyState === 2) {
        console.log("=> Waiting for existing connection to establish...");
        return new Promise((resolve, reject) => {
            mongoose.connection.once("connected", () => resolve(mongoose.connection));
            mongoose.connection.once("error", (err) => reject(err));
        });
    }

    // 3. Check if the URL exists and is valid
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl || (!dbUrl.startsWith('mongodb://') && !dbUrl.startsWith('mongodb+srv://'))) {
        console.error("Critical: DATABASE_URL is missing or incorrectly formatted in Environment Variables.");
        throw new Error("Invalid MongoDB connection scheme.");
    }

    try {
        // Disable buffering to fail fast if connection drops
        mongoose.set('bufferCommands', false);

        console.log("Starting new database connection...");
        const db = await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000,
            family: 4, // Forces IPv4 for better stability on Vercel
        });

        isConnected = !!db.connections[0].readyState;
        console.log("MongoDB Connected Successfully");
        return db;
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        throw error;
    }
};

export default connectDatabase;