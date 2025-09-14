import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    basePrice: { type: Number, required: true, min: 0 },
    discount: {
        type: {
            type: String,
            enum: ["flat", "percent"],
            required: true,
        },
        amount: { type: Number, required: true, min: 0 },
    },
    sku: { type: String, required: true, unique: true, trim: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    // rating: { type: Number, default: 4.5, min: 1, max: 5 },
    stockStatus: {
        type: String,
        enum: ["in stock", "out of stock", "preorder"],
        default: "in stock",
    },
    weightInGrams: { type: Number, min: 0, required: true },
    metalType: {
        type: String,
        enum: ["Gold", "Silver", "Platinum", "Rose Gold", "Other"],
        default: "Other",
        required: true,
    },
    gemstones: [{
        name: { type: String, required: true, trim: true },
        caratWeight: { type: Number, required: true, min: 0 },
        clarity: { type: String, required: true, trim: true }
    }],
    sizes: [{
        size: { type: String, required: true, trim: true },
        stockQuantity: { type: Number, required: true, default: 0, min: 0 },
        priceModifier: { type: Number, required: true, default: 0 },
    }],
    // colors: [{
    //     colorName: { type: String, required: true, trim: true },
    //     images: [{ type: String, required: true }],
    //     stockQuantity: { type: Number, default: 0, min: 0 },
    // }],
    colors: [{ type: String, trim: true, required: true }],
    tags: [{ type: String, trim: true, required: true }],
    materials: [{
        type: { type: String, trim: true, required: true },
        name: { type: String, trim: true, required: true },
        percentage: { type: Number, min: 0, max: 100, required: true },
    }],
    dimensions: {
        lengthMm: { type: Number, min: 0, required: true },
        widthMm: { type: Number, min: 0, required: true },
        heightMm: { type: Number, min: 0, required: true },
        diameterMm: { type: Number, min: 0 },
    },
    // reviews: [{
    //     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    //     rating: { type: Number, min: 1, max: 5, required: true },
    //     comment: { type: String, trim: true },
    //     createdAt: { type: Date, default: Date.now },
    // }],
}, { timestamps: true });

// Auto-update stock status
productSchema.pre("save", function (next) {
    let totalStock = 0;
    if (this.sizes?.length) {
        totalStock += this.sizes.reduce((sum, s) => sum + (s.stockQuantity || 0), 0);
    }
    // if (this.colors?.length) {
    //     totalStock += this.colors.reduce((sum, c) => sum + (c.stockQuantity || 0), 0);
    // }
    this.stockStatus = totalStock === 0 ? "out of stock" : "in stock";
    next();
});

// Virtual for final price
productSchema.virtual("finalPrice").get(function () {
    if (!this.discount || !this.discount.amount) return this.basePrice;
    if (this.discount.type === "flat") {
        return Math.max(0, this.basePrice - this.discount.amount);
    } else if (this.discount.type === "percent") {
        return Math.max(0, this.basePrice - (this.basePrice * this.discount.amount / 100));
    }
    return this.basePrice;
});

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
