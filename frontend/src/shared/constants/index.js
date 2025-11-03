// Site Info
export const SITE_NAME = "Vineta Jewellery";
export const SITE_TAGLINE = "Elegance That Speaks!";
export const SITE_CURRENCY = "₹";
export const SUPPORT_EMAIL = "support@vinetajewellery.in";
export const SUPPORT_PHONE = "+91-9876543210";
export const COMPANY_NAME = "Vineta Jewels Pvt. Ltd.";
export const COMPANY_ADDRESS = "123, MG Road, Jaipur, Rajasthan, India - 302001";
export const COMPANY_GSTIN = "08ABCDE1234F1Z5";

// API base URL
export const API_BASE_URL = "https://jwellery-catalogue-api.vercel.app/api/v1";

// Route Paths
export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  PRODUCT: "/product",
  CATEGORY: "/category",
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROFILE: "/profile",
  ORDERS: "/orders",
  WISHLIST: "/wishlist",
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",
  CONTACT: "/contact",
  ABOUT: "/about",
  TERMS: "/terms",
  PRIVACY: "/privacy",
};

// Theme
export const DEFAULT_THEME = "light";
export const THEME_OPTIONS = ["light", "dark"];

// Tax & Shipping
export const GST_PERCENTAGE = 3;
export const DEFAULT_SHIPPING_CHARGE = 79;
export const FREE_SHIPPING_THRESHOLD = 1999;

// Payment
export const SUPPORTED_PAYMENT_METHODS = [
  "Credit Card",
  "Debit Card",
  "Net Banking",
  "UPI",
  "Cash on Delivery"
];
export const ENABLE_COD = true;

// Pagination
export const PRODUCTS_PER_PAGE = 12;

// UI
export const TOAST_DURATION = 3000;
export const IMAGE_PLACEHOLDER = "/images/placeholder.png";
export const MAX_IMAGE_SIZE_MB = 2;

// Date & Time
export const DATE_FORMAT = "DD MMM YYYY";
export const TIME_FORMAT = "hh:mm A";

// Storage Keys
export const STORAGE_KEYS = {
  CART: "vineta_cart",
  WISHLIST: "vineta_wishlist",
  TOKEN: "vineta_token",
  USER: "vineta_user",
  THEME: "vineta_theme",
};

// SEO Defaults
export const SEO_DEFAULTS = {
  TITLE: "Vineta Jewellery - Elegance That Speaks",
  DESCRIPTION: "Shop exquisite and elegant jewellery collections for every occasion.",
  KEYWORDS: "jewellery, gold, diamond, vineta, earrings, rings, necklace",
};

// Order Statuses
export const ORDER_STATUSES = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  RETURNED: "Returned",
};

// Social Media
export const SOCIAL_LINKS = {
  INSTAGRAM: "https://instagram.com/vinetajewellery",
  FACEBOOK: "https://facebook.com/vinetajewellery",
  TWITTER: "https://twitter.com/vinetajewels",
  WHATSAPP: "https://wa.me/919876543210",
};

// Regex Patterns
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[6-9]\d{9}$/,
  PINCODE: /^[1-9][0-9]{5}$/,
};

// Stock/Inventory
export const INVENTORY_LABELS = {
  IN_STOCK: "In Stock",
  LOW_STOCK: "Only Few Left",
  OUT_OF_STOCK: "Out of Stock",
};

// Admin Roles
export const ADMIN_ROLES = ["superadmin", "manager", "editor"];
