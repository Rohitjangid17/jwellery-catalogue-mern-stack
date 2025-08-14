import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);

        console.log("database connected!");
    } catch (error) {
        console.error("database connection failed!", error.message);
        process.exit(1)
    }
}

export default connectDatabase;