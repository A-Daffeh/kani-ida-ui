import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../components/config/api';
import { showToast } from '../components/layouts/Toast';

// Create Order
export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, orderRequest }) => {
            const response = await api.post(`/public/order/${userId}`, orderRequest);
            return response.data.data.orderResponse;
        },
        onSuccess: () => {
            showToast('Order created successfully', 'success');
            queryClient.invalidateQueries(['orders']);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to create order';
            showToast(errorMessage, 'error');
        },
    });
};

// Fetch Order History
export const useFetchOrderHistory = (userId) => {
    return useQuery({
        queryKey: ['orders', userId],
        queryFn: async () => {
            if (!userId) {
                throw new Error("User ID is required to fetch order history");
            }
            const response = await api.get(`/public/order/user/${userId}`);
            return response.data.data.orders;
        },
        enabled: !!userId,
    });
};

// Fetch Order by ID
export const useFetchOrder = (orderId) => {
    return useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const response = await api.get(`/public/order/${orderId}`);
            return response.data.data.orderResponse;
        },
        enabled: !!orderId,
    });
};

// Cancel Order
export const useCancelOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (orderId) => {
            const response = await api.put(`/public/order/cancel/${orderId}`);
            return response.data.data;
        },
        onSuccess: (data, variables) => {
            showToast('Order canceled successfully', 'success');
            queryClient.invalidateQueries(['orders', variables.userId]);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to cancel order';
            showToast(errorMessage, 'error');
        },
    });
};
