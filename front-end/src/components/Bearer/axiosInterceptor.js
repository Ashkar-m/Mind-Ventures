
import axios from "axios";
import { baseUrl } from "../auth/authService";
import store from "../../store/store";
import { setCredentials, logout } from "../../features/authReducer";

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

// Function to refresh tokens
const refreshToken = async () => {
    const refreshTokenValue = store.getState().auth.refreshToken;
    
    const currentUser  = store.getState().auth.user;

    if (refreshTokenValue) {
        try {
            console.log("Refreshing token...", refreshTokenValue);
            const response = await axios.post(`${baseUrl}/users/token/refresh/`, {
                refresh: refreshTokenValue,
            });

            const { access: newAccessToken, refresh: newRefreshToken } = response.data;

            console.log("New tokens:", { newAccessToken, newRefreshToken });

            // Dispatch action to update user and tokens in Redux state
            store.dispatch(setCredentials({
                user: currentUser ,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            }));

            return newAccessToken;
        } catch (error) {
            console.error("Token refresh error:", error);
            store.dispatch(logout());
            throw error;
        }
    } else {
        store.dispatch(logout());
    }
};

// Function to set up token refresh based on fixed expiration time
const setupTokenRefresh = () => {
    // Set the access token lifetime (in milliseconds)
    const ACCESS_TOKEN_LIFETIME = 5 * 60 * 1000; // 5 minutes
    const REFRESH_BEFORE_EXPIRATION = 4 * 60 * 1000; // Refresh 1 minute before expiration

    setTimeout(async () => {
        try {
            await refreshToken();
            setupTokenRefresh(); // Reset the refresh timer
        } catch (error) {
            console.error("Error during scheduled token refresh:", error);
        }
    }, ACCESS_TOKEN_LIFETIME - REFRESH_BEFORE_EXPIRATION); // Set timeout for 4 minutes
};

// Initial setup
setupTokenRefresh();

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log("Error in interceptor", error);
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log("401 detected");
            originalRequest._retry = true;

            const accessToken = await refreshToken();
            
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

            return axiosInstance(originalRequest);
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;