// src/services/ProductService.js
import axios from 'axios';

// const API_URL = 'https://kaniidaandbeyond.com/api/admin/products/create';
const API_URL = 'http://localhost:8082/api/admin/products/create';

const getAllProducts = () => {
    return axios.get(API_URL);
};

const getProductById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createProduct = (category_id, product) => {
    return axios.post(`${API_URL}/${category_id}`, product);
};

const updateProduct = (id, product) => {
    return axios.put(`${API_URL}/${id}`, product);
};

const deleteProduct = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
