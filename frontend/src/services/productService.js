import api from "./api";

export const productService = {
    getAllProducts: async () => {
        const response = await api.get('/product');
        return response.data;
    },
    // getPaginatedProducts: async () =>{
    //     const response = await api.get("")
    // }

    getProductById: async (product_id) => {
        const response = await api.get(`/product?product_id=${product_id}`);
        return response.data;
    }
}