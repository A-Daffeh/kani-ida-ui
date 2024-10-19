import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../components/config/api';
import { showToast } from '../components/layouts/Toast';

// Fetch Cart
export const useFetchCart = (userId) => {
    return useQuery({
        queryKey: ['cart', userId],
        queryFn: async () => {
            if (!userId) {
                throw new Error("User ID is required to fetch the cart");
            }
            const response = await api.get(`/public/cart/${userId}`);

            if (!response.data.data || !response.data.data.cartResponse) {
                throw new Error("Cart data is not available");
            }

            return response.data.data.cartResponse;
        },
        enabled: !!userId,
    });
};


// Add Item To Cart
export const useAddItemToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, item }) => {
            const response = await api.post(`/public/cart/add/${userId}`, item);
            return response.data.data.cartResponse;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['cart', variables.userId]);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
            showToast(errorMessage, 'error');
        },
    });
};


// Update Cart Item
export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ cartItemId, quantity }) => {
            const response = await api.put(`/public/cart/item/update`, { cartItemId, quantity });
            return response.data.data.cartItem;
        },
        onSuccess: (data, variables) => {
            showToast('Cart item updated successfully', 'success');
            queryClient.invalidateQueries(['cart', variables.userId]);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to update cart item';
            showToast(errorMessage, 'error');
        },
    });
};


// Remove Cart Item
export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, cartItemId }) => {
            const response = await api.delete(`/public/cart/item/${userId}/remove/${cartItemId}`);
            return response.data.data.cartResponse;
        },
        onSuccess: (data, variables) => {
            showToast('Item removed from cart', 'success');
            queryClient.invalidateQueries(['cart', variables.userId]);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to remove cart item';
            showToast(errorMessage, 'error');
        },
    });
};


// Clear Cart
export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId }) => {
            const response = await api.put(`/public/cart/${userId}/clear`);
            return response.data.data.cartResponse;
        },
        onSuccess: (data, variables) => {
            showToast('Cart cleared successfully', 'success');
            queryClient.invalidateQueries(['cart', variables.userId]);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to clear cart';
            showToast(errorMessage, 'error');
        },
    });
};