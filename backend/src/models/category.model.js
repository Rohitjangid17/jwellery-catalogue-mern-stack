import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
export default Category;