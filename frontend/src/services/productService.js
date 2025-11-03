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
    },

    //  get sorted product
    getSortedProducts: async (sort_by) => {
        const response = await api.get(`/product?sort_by=${sort_by}`);
        return response.data;
    }
}