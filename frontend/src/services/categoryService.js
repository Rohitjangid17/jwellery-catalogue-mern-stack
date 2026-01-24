import api from "./api";

export const categoryService = {
    // get paginated category
    getPaginatedCategory: async ({ page = 1, limit = 10, }) => {
        const response = await api.get(`/category?page=${page}&limit=${limit}`);
        return response.data;
    },
    // get category list
    getCategories: async () => {
        const response = await api.get('/category');
        return response.data;
    },
    // create category
    createCategory: async (category_data) => {
        const response = await api.post('/category', category_data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
    // delete category
    deleteCategoryById: async (category_id) => {
        const response = await api.delete(`/category?category_id=${category_id}`);
        return response.data;
    },
    // update category
    updateCategoryById: async (category_id, category_data) => {
        const response = await api.put(`/category?category_id=${category_id}`, category_data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
}