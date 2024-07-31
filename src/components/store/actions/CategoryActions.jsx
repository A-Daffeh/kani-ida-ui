import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../config/api';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async ({ page = 0, size = 10 }) => {
    const response = await api.get(`/public/categories?page=${page}&size=${size}`);
    return response.data.categories;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/admin/categories/create', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
