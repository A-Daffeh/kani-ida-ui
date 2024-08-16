import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useAddCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCategory) => {
            const response = await axios.post('http://localhost:8082/admin/categories/create', newCategory, {
                withCredentials: 'include',
            });
            return response.data;
        },
        onSuccess: () => {
            // Invalidate and refetch categories with all existing queryKeys for pagination
            queryClient.invalidateQueries({ queryKey: 'categories' });
        },
    });
};

export const useFetchCategories = ({ page = 0, size = 10 }) => {
    return useQuery({
        queryKey: ['categories', page, size],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8082/public/categories?page=${page}&size=${size}`);
            return response.data.categories;
        },
    });
};
