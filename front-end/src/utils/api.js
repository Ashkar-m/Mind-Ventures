import axios from 'axios';

const baseUrl='http://127:0.0.1:8000/'

const api = axios.create({
    baseURL : baseUrl,
});

api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                const refreshToken = JSON.parse(localStorage.getItem('REFRESH_TOKEN'))
                const response = await axios.post(`${baseUrl}/users/token/refresh`, { refresh : refreshToken });
                localStorage.setItem("REFRESH_TOKEN", JSON.stringify(response.data));
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                return api(originalRequest);
            } catch(error) {
                localStorage.removeItem("REFRESH_TOKEN");
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;