import axios from "axios";
import { baseUrl } from "../auth/authService";
import store from "../../store/store";
import { setCredentials,logout } from "../../features/authReducer";

const axiosInstance = axios.create({
    baseURL : baseUrl,
});

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

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             const state = store.getState();
//             const refreshToken = state.auth.refreshToken; // Get refreshToken from Redux state

//             if (refreshToken) {
//                 try {
//                     // Call your refresh token endpoint to get a new access token
//                     const response = await axios.post(`${baseUrl}/users/token/refresh/`, {
//                         refreshToken,
//                     });

//                     const { accessToken, refreshToken: newRefreshToken, user } = response.data;

//                     // Dispatch setCredentials to store the new tokens in Redux
//                     store.dispatch(setCredentials({ user, accessToken, refreshToken: newRefreshToken }));

//                     // Update original request with the new access token
//                     originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

//                     // Retry the original request with the new access token
//                     return axiosInstance(originalRequest);
//                 } catch (err) {
//                     // If refresh token fails, logout the user
//                     store.dispatch(logout());
//                     return Promise.reject(err);
//                 }
//             }
//         }

//         return Promise.reject(error);
//     }
// );


// export default axiosInstance;

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             const state = store.getState();
//             const refreshToken = state.auth.refreshToken; // Get refreshToken from Redux state

//             if (refreshToken) {
//                 try {
//                     // Refresh the access token using the refresh token
//                     const response = await axios.post(`${baseUrl}/users/token/refresh/`, {
//                         refresh: refreshToken,  // Ensure the payload uses the correct key "refresh"
//                     });

//                     const { access: accessToken, refresh: newRefreshToken, user } = response.data;

//                     // Dispatch setCredentials to store the new tokens in Redux
//                     store.dispatch(setCredentials({ user, accessToken, refreshToken: newRefreshToken }));

//                     // Update original request with the new access token
//                     originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

//                     // Retry the original request with the new access token
//                     return axiosInstance(originalRequest);
//                 } catch (err) {
//                     // If refresh token fails, logout the user
//                     store.dispatch(logout());
//                     return Promise.reject(err);
//                 }
//             } else {
//                 // No refresh token available, log the user out
//                 store.dispatch(logout());
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         // Check if we received a 401 error
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             const refreshToken = store.getState().auth.refreshToken; // Get refreshToken from Redux state

//             if (refreshToken) {
//                 try {
//                     // Refresh the access token using the refresh token
//                     const response = await axios.post(`${baseUrl}/users/token/refresh/`, {
//                         refresh: refreshToken,
//                     });
//                     console.log('Refresh Token Response:', response.data);  // Debug log

//                     // Destructure new tokens from the response
//                     const { access: newAccessToken, refresh: newRefreshToken, user } = response.data;
//                     console.log('New Access Token:', newAccessToken);

//                     // Dispatch action to update tokens in Redux state
//                     store.dispatch(setCredentials({ user, accessToken: newAccessToken, refreshToken: newRefreshToken }));

//                     // Update original request with the new access token
//                     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//                     // Retry the original request with the new access token
//                     return axiosInstance(originalRequest);
//                 } catch (err) {
//                     // If refresh token fails, log out the user
//                     store.dispatch(logout());
//                     console.error('Token Refresh Error:', err.response?.data);
//                     return Promise.reject(err);
//                 }
//             } else {
//                 // No refresh token available, log out the user
//                 store.dispatch(logout());
//             }
//         }

//         return Promise.reject(error);
//     }
// );

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log("Error in interceptor", error);  // Log to see if the interceptor catches the error
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log("401 detected");  // Log to see if it's a 401 error
            originalRequest._retry = true;

            const refreshToken = store.getState().auth.refreshToken;

            if (refreshToken) {
                try {
                    console.log("Refreshing token...", refreshToken);  // Log to track refresh token usage

                    const response = await axios.post(`${baseUrl}/users/token/refresh/`, {
                        refresh: refreshToken,
                    });

                    const { access: newAccessToken, refresh: newRefreshToken } = response.data;

                    console.log("New tokens:", { newAccessToken, newRefreshToken });

                    // Dispatch action to update tokens in Redux state
                    store.dispatch(setCredentials({ accessToken: newAccessToken, refreshToken: newRefreshToken }));

                    // Update the original request with the new access token
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // Retry the original request
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    store.dispatch(logout());
                    console.error("Token refresh error:", refreshError);
                    return Promise.reject(refreshError);
                }
            } else {
                store.dispatch(logout());
            }
        }

        return Promise.reject(error);
    }
);



export default axiosInstance;