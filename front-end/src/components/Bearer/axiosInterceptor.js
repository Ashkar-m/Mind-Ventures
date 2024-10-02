import axios from "axios";
import { baseUrl } from "../auth/authService";

const axiosInstance = axios.create({
    baseURL : baseUrl,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
        
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;