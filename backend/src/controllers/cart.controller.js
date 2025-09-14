import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

/**
 * Helper: Recalculate cart summary
 */
const recalcSummary = (cart) => {
    let subtotal = 0;
    let totalDiscount = 0;

    cart.items.forEach(item => {
        subtotal += item.price.finalPrice * item.quantity;
        totalDiscount += item.price.discount * item.quantity;
    });

    cart.summary.subtotal = subtotal;
    cart.summary.totalDiscount = totalDiscount;
    cart.summary.grandTotal = subtotal - totalDiscount - (cart.coupon?.discountAmount || 0);

    if (cart.summary.grandTotal < 0) cart.summary.grandTotal = 0;
    return cart;
};

/**
 * Add item to cart
 */
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1, size, color, metalType, gemstones, customization } = req.body;
        const userId = req.user._id;

        // 1. Check product
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // 2. Compute price
        let basePrice = product.finalPrice;
        let sizeModifier = 0;
        if (size) {
            const sizeObj = product.sizes.find(s => s.size === size.size);
            if (sizeObj) sizeModifier = sizeObj.priceModifier;
        }
        const finalPrice = basePrice + sizeModifier;

        // 3. Find existing cart
        let cart = await Cart.findOne({ userId });
        if (!cart) cart = new Cart({ userId, items: [] });

        // 4. Check if same item (with same variant) already exists
        const existingItem = cart.items.find(item =>
            item.productId.toString() === productId &&
            item.size?.size === size?.size &&
            item.color === color &&
            item.metalType === metalType
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId,
                size,
                color,
                metalType,
                gemstones,
                customization,
                price: {
                    basePrice,
                    discount: product.discount?.amount || 0,
                    finalPrice,
                },
                quantity,
                snapshot: {
                    title: product.title,
                    sku: product.sku,
                    images: product.images,
                    category: product.category,
                    weightInGrams: product.weightInGrams,
                    materials: product.materials,
                },
            });
        }

        recalcSummary(cart);
        await cart.save();

        res.status(201).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding to cart" });
    }
};

/**
 * Get user cart
 */
export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart) return res.json({ message: "Cart is empty", items: [] });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart" });
    }
};

/**
 * Update item quantity
 */
export const updateCartItem = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const userId = req.user._id;

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.id(itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        item.quantity = quantity;

        recalcSummary(cart);
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Error updating cart item" });
    }
};

/**
 * Remove item from cart
 */
export const removeCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.user._id;

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

        recalcSummary(cart);
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Error removing cart item" });
    }
};

/**
 * Clear cart
 */
export const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = [];
        recalcSummary(cart);
        await cart.save();

        res.json({ message: "Cart cleared", cart });
    } catch (err) {
        res.status(500).json({ message: "Error clearing cart" });
    }
};
