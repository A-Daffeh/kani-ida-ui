import axios from 'axios';

// Global axios configuration
axios.defaults.withCredentials = true;  // Ensure credentials are sent with requests
axios.defaults.baseURL = 'http://localhost:8082';  // Set your base URL

export const login = async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
};

export const register = async (data) => {
    const response = await axios.post('/auth/register', data);
    return response.data;
};

export const logout = async () => {
    const response = await axios.post('/auth/logout', {}, { withCredentials: true });
    return response.data;
};

export const getCurrentUser = async (userId) => {
    const response = await axios.get(`/public/users/profile/${userId}`);
    return response.data;
};
