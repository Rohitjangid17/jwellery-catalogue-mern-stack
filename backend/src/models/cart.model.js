import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    // Store selected size variant
    size: {
        size: { type: String, trim: true },
        priceModifier: { type: Number, default: 0 },
    },

    // Store selected color if applicable
    color: { type: String, trim: true },

    // Metal type chosen (if product has multiple options)
    metalType: {
        type: String,
        enum: ["Gold", "Silver", "Platinum", "Rose Gold", "Other"]
    },

    // Optional gemstone selection (if multiple variants exist)
    gemstones: [{
        name: { type: String, trim: true },
        caratWeight: Number,
        clarity: String,
    }],

    // Snapshot of pricing (calculated when item is added to cart)
    price: {
        basePrice: { type: Number, required: true },
        discount: { type: Number, default: 0 }, // final applied discount amount
        finalPrice: { type: Number, required: true },
    },

    quantity: { type: Number, default: 1, min: 1 },

    // Store product snapshot (title, images, SKU, etc.)
    snapshot: {
        title: String,
        sku: String,
        images: [String],
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        weightInGrams: Number,
        materials: [{
            type: { type: String },
            name: String,
            percentage: Number,
        }],
    },

    // Customization support
    customization: {
        engravingText: { type: String, trim: true },
        specialInstructions: { type: String, trim: true },
    },
}, { timestamps: true });

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    items: [CartItemSchema],

    // Coupon or promotion applied
    coupon: {
        code: String,
        discountAmount: { type: Number, default: 0 },
    },

    // Cart summary
    summary: {
        subtotal: { type: Number, default: 0 },
        totalDiscount: { type: Number, default: 0 },
        grandTotal: { type: Number, default: 0 },
    },

    status: {
        type: String,
        enum: ["active", "converted", "abandoned"],
        default: "active",
    },

}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;