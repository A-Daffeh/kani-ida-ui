// src/axiosConfig.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Global axios configuration
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'https://kaniidaandbeyond.com/';
axios.defaults.baseURL = 'http://localhost:8082/';


let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
};

// Add a request interceptor to include JWT in the Authorization header
axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token refresh
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if error is due to an expired token and refresh token is available
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshToken = Cookies.get('refresh-token');
                    const response = await axios.post('/auth/refresh-token', { refreshToken });

                    const newToken = response.data.authResponse.jwt;
                    Cookies.set('access-token', newToken, { expires: 7 }); // Update the JWT token in the cookie
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

                    isRefreshing = false;
                    onRefreshed(newToken);

                    // Retry the original request with the new token
                    return axios(originalRequest);
                } catch (err) {
                    isRefreshing = false;
                    Cookies.remove('access-token');
                    Cookies.remove('refresh-token');
                    // Redirect to login page or handle the error accordingly
                    window.location.href = '/login';
                    return Promise.reject(err);
                }
            }

            return new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    // Replace the expired token and retry the original request
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axios(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default axios;
