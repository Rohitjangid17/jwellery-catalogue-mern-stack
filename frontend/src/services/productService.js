import api from "./api";

export const productService = {
    getAllProducts: async () => {
        const response = await api.get('/product');
        return response.data;
    },
    // getPaginatedProducts: async () =>{
    //     const response = await api.get("")
    // }
    deleteProduct: async (product_id) => {
        const response = await api.delete(`/product?product_id=${product_id}`);
        return response.data;
    },
    getProductById: async (product_id) => {
        const response = await api.get(`/product?product_id=${product_id}`);
        return response.data;
    },
    //  get sorted product
    getSortedProducts: async (sort_by) => {
        const response = await api.get(`/product?sort_by=${sort_by}`);
        return response.data;
    },
    // get product by category
    getProductsByCategory: async (category_id) => {
        const response = await api.get(`/product?category_id=${category_id}`);
        return response.data;
    },
    // create product
    createProduct: async (formData) => {
        const response = await api.post('/product', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    }
}