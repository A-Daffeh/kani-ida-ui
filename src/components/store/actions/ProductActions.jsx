import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../config/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page = 0, size = 10 }) => {
    const response = await api.get(`/public/products?page=${page}&size=${size}`);
    return response.data;
});


export const addProduct = createAsyncThunk('products/addProduct', async (data, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('productRequest', new Blob([JSON.stringify({
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            availability: data.availability === 'true',
            category: data.category
        })], { type: 'application/json' }));

        formData.append('file', data.file[0]);

        const response = await api.post(`/admin/products/create/${data.category}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

