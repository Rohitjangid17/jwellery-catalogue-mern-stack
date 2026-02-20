import api from "./api";

export const categoryService = {
    // login user
    login: async (user_data) => {
        const response = await api.post("/auth/login/admin", user_data);
        return response.data;
    }
}