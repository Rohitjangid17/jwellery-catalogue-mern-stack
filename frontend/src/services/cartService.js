import api from "./api";

export const cartService = {
    // add to cart
    addToCart: async (product_data) => {
        const response = await api.post("/cart", product_data);
        return response.data;
    }
}