import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error?.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
