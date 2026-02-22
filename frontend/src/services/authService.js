import api from "./api";

export const authService = {
    // login user
    login: async (user_data) => {
        const response = await api.post("/auth/login/admin", user_data);
        return response.data;
    },
    // logout user
    logout: async () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
    },
    // customer login
    customerLogin: async (user_data) => {
        const response = await api.post("/auth/login/customer", user_data);
        return response.data;
    },
    // customer register
    customerRegister: async (user_data) => {
        const response = await api.post("/auth/register/customer", user_data);
        return response.data;
    }
}