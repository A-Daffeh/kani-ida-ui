import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../config/api';

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ userId, item }) => {
    const response = await api.post(`/public/cart/add/${userId}`, item);
    return response.data.cartResponse;
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ cartItemId, quantity }) => {
    const response = await api.put(`/public/cart/item/update`, { cartItemId, quantity });
    return response.data.cartItem;
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async ({ userId, cartItemId }) => {
    const response = await api.delete(`/public/cart/item/${userId}/remove/${cartItemId}`);
    return response.data.cartResponse;
});

export const clearCart = createAsyncThunk('cart/clearCart', async ({ userId }) => {
    const response = await api.put(`/public/cart/${userId}/clear`);
    return response.data.cart;
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async ({ userId }) => {
    const response = await api.get(`/public/cart/${userId}`);
    return response.data.cartResponse;
});
