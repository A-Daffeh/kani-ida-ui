import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../components/config/api';

// Fetch cart
export const useFetchCart = (userId) => {
    return useQuery(['cart', userId], async () => {
        const response = await api.get(`/public/cart/${userId}`);
        return response.data.cartResponse;
    });
};

// Add item to cart
export const useAddItemToCart = () => {
    const queryClient = useQueryClient();

    return useMutation(async ({ userId, item }) => {
        const response = await api.post(`/public/cart/add/${userId}`, item);
        return response.data.cartResponse;
    }, {
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['cart', variables.userId]);
        },
    });
};

// Update cart item
export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation(async ({ cartItemId, quantity }) => {
        const response = await api.put(`/public/cart/item/update`, { cartItemId, quantity });
        return response.data.cartItem;
    }, {
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['cart', variables.userId]);
        },
    });
};

// Remove cart item
export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation(async ({ userId, cartItemId }) => {
        const response = await api.delete(`/public/cart/item/${userId}/remove/${cartItemId}`);
        return response.data.cartResponse;
    }, {
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['cart', variables.userId]);
        },
    });
};

// Clear cart
export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation(async ({ userId }) => {
        const response = await api.put(`/public/cart/${userId}/clear`);
        return response.data.cart;
    }, {
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['cart', variables.userId]);
        },
    });
};
