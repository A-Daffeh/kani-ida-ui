import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../components/config/api';
import { showToast } from '../components/layouts/Toast';

// Create Order
export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, cartId, orderRequest }) => {
            try {
                console.log('Making API request with:', { userId, cartId, orderRequest });
                
                const response = await api.post(`/public/order/${userId}/payment/${cartId}`, orderRequest);
                
                console.log('API response:', response);
                console.log('Response data:', response.data);
                
                // Safely access nested properties
                if (!response.data) {
                    throw new Error('No data received from server');
                }
                
                // Based on your API response, the payment data is directly in response.data
                const paymentData = response.data;
                
                if (!paymentData) {
                    console.error('Payment data not found in response:', response.data);
                    throw new Error('Payment information not found in server response');
                }
                
                // Ensure we have a payment URL
                if (!paymentData.paymentUrl) {
                    console.error('Payment URL not found in response:', paymentData);
                    throw new Error('Payment URL not found in server response');
                }
                
                console.log('Payment data:', paymentData);
                return paymentData;
                
            } catch (error) {
                console.error('Error in mutationFn:', error);
                console.error('Error response:', error.response);
                throw error;
            }
        },
        onSuccess: (paymentData) => {
            console.log('Order creation successful, payment data:', paymentData);
            showToast('Order created successfully', 'success');
            queryClient.invalidateQueries(['orders']);
            
            // Based on your API response structure, paymentUrl is directly available
            const paymentUrl = paymentData.paymentUrl;
            
            if (paymentUrl) {
                console.log('Redirecting to payment URL:', paymentUrl);
                setTimeout(() => {
                    window.location.href = paymentUrl;
                }, 1000);
            } else {
                console.warn('No payment URL found in payment data:', paymentData);
                showToast('Order created but payment URL not found. Please contact support.', 'warning');
            }
        },
        onError: (error) => {
            console.error('Order creation error:', error);
            const errorMessage = error.response?.data?.message || 
                                error.message || 
                                'Failed to create order';
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
            
            console.log(`Fetching orders for userId: ${userId}, page: ${page}, size: ${size}`);
            
            const response = await api.get(`/public/order/customerorders/${userId}`, { 
                params: { page, size } 
            });

            console.log('Order history response:', response.data);

            // The backend returns Page<OrderResponse> directly, not wrapped in a data object
            if (!response.data) {
                throw new Error("No data received from server");
            }

            // Return the response data directly (it contains content, totalPages, etc.)
            console.log(response.data);
            return response.data;
        },
        enabled: !!userId,
        retry: 3,
        retryDelay: 1000,
        onError: (error) => {
            console.error('Order history fetch error:', error);
            const errorMessage = error.response?.data?.message || 
                                error.message || 
                                'Failed to fetch order history';
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



