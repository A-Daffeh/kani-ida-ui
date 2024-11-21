import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../components/config/api';
import { showToast } from '../components/layouts/Toast';


export const useFetchUsers = (page = 0, size = 10) => {
    return useQuery({
        queryKey: ['users', page, size],
        queryFn: async () => {
            const response = await api.get(`/admin/users`, { params: { page, size } });

            if (!response.data.data || !response.data.data.content) {
                throw new Error("User data is not available");
            }

            console.log(response.data);

            return response.data.data;
        },
        enabled: true,
    });
};



export const useUpdateUserRole = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ userId, role }) => {
            const response = await api.put(`/admin/users/${userId}/role`, null, {
                params: { role },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to update user role';
            showToast(errorMessage, 'error');
        },
    });
};

export const useAddUserAddress = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ userId, addressRequest }) => {
            const response = await api.put(`/public/users/address/${userId}`, addressRequest);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to add address';
            showToast(errorMessage, 'error');
        },
    });
};


export const useRemoveUserAddress = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ userId, addressId }) => {
            const response = await api.delete(`/public/users/${userId}/address/${addressId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to remove address';
            showToast(errorMessage, 'error');
        },
    });
};




