import axios from 'axios';
import { API_BASE_URL } from '../shared/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
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
