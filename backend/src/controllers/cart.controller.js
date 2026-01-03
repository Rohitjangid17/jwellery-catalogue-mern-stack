import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

/**
 * Helper: Recalculate cart summary
 */
const recalcSummary = (cart) => {
  let subtotal = 0;
  let totalDiscount = 0;

  cart.items.forEach((item) => {
    subtotal += item.price.basePrice * item.quantity;
    totalDiscount += item.price.discount * item.quantity;
  });

  cart.summary.subtotal = subtotal;
  cart.summary.totalDiscount = totalDiscount;
  cart.summary.grandTotal =
    subtotal - totalDiscount - (cart.coupon?.discountAmount || 0);

  if (cart.summary.grandTotal < 0) {
    cart.summary.grandTotal = 0;
  }
};

/**
 * POST /api/v1/cart
 * Add item to cart
 */
export const addToCart = async (req, res) => {
  try {
    const {
      productId,
      quantity = 1,
      size,
      color,
      metalType,
      gemstones,
      customization,
    } = req.body;

    const userId = req.user.id;

    // 1. Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Price calculation
    let basePrice = product.finalPrice;
    let sizeModifier = 0;

    if (size?.size && product.sizes?.length) {
      const sizeObj = product.sizes.find(
        (s) => s.size === size.size
      );
      if (sizeObj) sizeModifier = sizeObj.priceModifier || 0;
    }

    const finalPrice = basePrice + sizeModifier;

    // 3. Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // 4. Check existing cart item (same variant)
    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.size?.size === size?.size &&
        item.color === color &&
        item.metalType === metalType &&
        JSON.stringify(item.customization || {}) ===
        JSON.stringify(customization || {})
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
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: error.message, message: "Error adding to cart" });
  }
};

/**
 * GET /api/v1/cart
 * Get user cart
 */
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId"
    );

    if (!cart) {
      return res.json({
        items: [],
        summary: {
          subtotal: 0,
          totalDiscount: 0,
          grandTotal: 0,
        },
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

/**
 * PUT /api/v1/cart?cart_id=<ITEM_ID>
 * Update cart item quantity
 */
export const updateCartItem = async (req, res) => {
  try {
    const { cart_id } = req.query;
    const { quantity } = req.body;
    const userId = req.user._id;

    if (!cart_id) {
      return res.status(400).json({ message: "cart_id is required" });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(cart_id);
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.quantity = quantity;

    recalcSummary(cart);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ message: "Error updating cart item" });
  }
};

/**
 * DELETE /api/v1/cart?cart_id=<ITEM_ID>
 * Remove cart item
 */
export const removeCartItem = async (req, res) => {
  try {
    const { cart_id } = req.query;
    const userId = req.user._id;

    if (!cart_id) {
      return res.status(400).json({ message: "cart_id is required" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== cart_id
    );

    recalcSummary(cart);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Remove cart item error:", error);
    res.status(500).json({ message: "Error removing cart item" });
  }
};
