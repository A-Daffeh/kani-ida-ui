import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../components/config/api';
import { showToast } from '../components/layouts/Toast';

export const useAddCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCategory) => {
            const response = await api.post('/admin/categories/create', newCategory);
            return response.data;
        },
        onSuccess: (data) => {
            showToast(data.message, 'success');
            queryClient.invalidateQueries({ queryKey: 'categories' });
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to create category';
            showToast(errorMessage, 'error');
        },
    });
};

export const useFetchCategories = ({ page = 0, size = 10 }) => {
    return useQuery({
        queryKey: ['categories', page, size],
        queryFn: async () => {
            const response = await api.get(`/public/categories?page=${page}&size=${size}`);
            return response.data.data.categories;
        },
    });
};

export const useFetchCategoryById = (id) => {
    return useQuery({
        queryKey: ['category', id],
        queryFn: async () => {
            const response = await api.get(`/admin/categories/${id}`);
            return response.data.data.category;
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to fetch category';
            showToast(errorMessage, 'error');
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updatedCategory }) => {
            const response = await api.put(`/admin/categories/${id}`, updatedCategory);
            return response.data;
        },
        onSuccess: (data) => {
            showToast(data.message, 'success');
            queryClient.invalidateQueries({ queryKey: 'categories' });
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to update category';
            showToast(errorMessage, 'error');
        },
    });
};
