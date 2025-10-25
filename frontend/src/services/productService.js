import api from "./api";

export const productService = {
    getAllProducts: async () => {
        const response = await api.get('/product');
        return response.data;
    },
    getPaginatedProducts: async () =>{
        const response = await api.get("")
    }
}