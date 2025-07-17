import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true; 
// axios.defaults.baseURL = 'https://kaniidaandbeyond.com';
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
