import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import api from '../components/config/api';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true; 
axios.defaults.baseURL = 'http://localhost:8082';

export const login = async (credentials) => {
    const response = await axios.post('/auth/login', credentials);

   const { jwt, refreshToken } = response.data.data.authResponse;
   Cookies.set('access-token', jwt, { expires: 7 });
   Cookies.set('refresh-token', refreshToken, { expires: 7 });

    return response.data;
};

export const register = async (data) => {
    const response = await axios.post('/auth/register', data);
    return response.data;
};

export const logout = async () => {
    const response = await axios.post('/auth/logout', {}, { withCredentials: true });
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');
    return response.data;
};

export const getCurrentUser = async (userId) => {
    const response = await axios.get(`/public/users/profile/${userId}`);
    return response.data;
};

// Fetch Users
export const useFetchUsers = (page = 0, size = 10) => {
    return useQuery({
        queryKey: ['users', page, size],
        queryFn: async () => {
            const response = await api.get(`/auth/users`, { params: { page, size } });

            if (!response.data.data || !response.data.data.users) {
                throw new Error("User data is not available");
            }

            return response.data.data.users;
        },
        enabled: true,
    });
};

