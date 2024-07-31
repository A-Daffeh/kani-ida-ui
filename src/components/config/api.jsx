import axios from 'axios';

axios.defaults.withCredentials = true;

const instance = axios.create({
    baseURL: 'http://localhost:8082',
    withCredentials: true,
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post('http://localhost:8082/auth/refresh', {}, { withCredentials: true });
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access-token;
                return axios(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;