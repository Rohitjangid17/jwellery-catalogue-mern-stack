import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 100
    },
    phone_number: {
        type: String,
        trim: true,
        maxlength: 20,
    },
    subject: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    }
}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);