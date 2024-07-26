import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart, updateCartItem, removeCartItem, clearCart, fetchCart } from '../actions/CartActions';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.items = [];
                state.total = 0;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default cartSlice.reducer;
