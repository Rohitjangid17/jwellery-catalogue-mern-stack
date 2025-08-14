import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'; // You can set env variable

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // if you're using cookies or auth sessions
});

// You can also add interceptors here if needed
api.interceptors.response.use(
    response => response,
    error => {
        // Global error handling
        console.error('API Error:', error?.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
