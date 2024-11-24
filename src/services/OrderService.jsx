import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../components/config/api';
import { showToast } from '../components/layouts/Toast';

// Create Order
export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, cartId, orderRequest }) => {
            const response = await api.post(`/public/order/${userId}/payment/${cartId}`, orderRequest);
            return response.data.data.payment;
        },
        onSuccess: (payment) => {
            showToast('Order created successfully', 'success');
            queryClient.invalidateQueries(['orders']);
            if (payment?.paymentUrl) {
                window.location.href = payment.paymentUrl;
            }
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to create order';
            showToast(errorMessage, 'error');
        },
    });
};



// Fetch Order History
export const useFetchOrderHistory = (userId, page = 0, size = 10) => {
    return useQuery({
        queryKey: ['orders', userId, page, size],
        queryFn: async () => {
            if (!userId) {
                throw new Error("User ID is required to fetch order history");
            }
            const response = await api.get(`/public/order/user/${userId}`, { params: { page, size } });

            if (!response.data?.data?.orders) {
                throw new Error("Failed to fetch orders");
            }

            return response.data.data.orders;
        },
        enabled: !!userId,
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to fetch order history';
            showToast(errorMessage, 'error');
        },
    });
};


// Fetch Order by ID
export const useFetchOrder = (orderId, page = 0, size = 10) => {
    return useQuery({
        queryKey: ['order', orderId, page, size],
        queryFn: async () => {
            const response = await api.get(`/public/order/${orderId}?page=${page}&size=${size}`);
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

// Update Order Status
export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ orderId, status }) => {
        const response = await api.put(`/admin/orders/${orderId}/update/${status}`);
        return response.data.data.orderResponse;
      },
      onSuccess: () => {
        showToast('Order status updated successfully', 'success');
        queryClient.invalidateQueries(['adminOrders']);
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to update order status';
        showToast(errorMessage, 'error');
      },
    });
};
  

// Fetch Orders
export const useFetchOrders = (page = 0, size = 10) => {
    return useQuery({
        queryKey: ['adminOrders', page, size],
        queryFn: async () => {
            const response = await api.get(`/admin/orders?page=${page}&size=${size}`);
            return response.data.data.orders;
        },
    });
};



