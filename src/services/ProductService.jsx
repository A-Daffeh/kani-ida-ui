import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../components/config/api';

// Fetch products
export const useFetchProducts = ({ page = 0, size = 10 }) => {
    return useQuery(['products', page, size], async () => {
        const response = await api.get(`/public/products?page=${page}&size=${size}`);
        return response.data;
    });
};

// Add a new product
export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation(async (data) => {
        const formData = new FormData();
        formData.append('productRequest', new Blob([JSON.stringify({
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            availability: data.availability === 'true',
            category: data.category
        })], { type: 'application/json' }));

        formData.append('file', data.file[0]);

        const response = await api.post(`/admin/products/create/${data.category}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }, {
        onSuccess: () => {
            // Invalidate and refetch the products list
            queryClient.invalidateQueries('products');
        },
    });
};
