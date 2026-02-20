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
    }
}