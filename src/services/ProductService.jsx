import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../components/config/api';
import { showToast } from '../components/layouts/Toast';

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append('productRequest', new Blob([JSON.stringify({
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                availability: data.availability === 'true',
                quantity: data.quantity,
                category: data.category
            })], { type: 'application/json' }));

            formData.append('file', data.file[0]);

            const response = await api.post(`/admin/products/create/${data.category}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        },
        onSuccess: (data) => {
            showToast(data.message, 'success');
            queryClient.invalidateQueries({ queryKey: 'products' });
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to create product';
            showToast(errorMessage, 'error');
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const id = data.id;
            data = data.data;
            
            const formData = new FormData();
            formData.append('productRequest', new Blob([JSON.stringify({
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                availability: data.availability === 'true',
                quantity: data.quantity,
                category: data.category
            })], { type: 'application/json' }));

            if (data.file && data.file.length > 0) {
                formData.append('file', data.file[0]); 
            }
            
            const response = await api.put(`/admin/products/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response;
        },
        onSuccess: (data) => {
            showToast(data.message, 'success');
            queryClient.invalidateQueries({ queryKey: ['product', data.id] });
            queryClient.invalidateQueries({ queryKey: 'products' });
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to update product';
            showToast(errorMessage, 'error');
        },
    });
};

export const useFetchProducts = ({ page = 0, size = 10 }) => {
    return useQuery({
        queryKey: ['products', page, size],
        queryFn: async () => {
            const response = await api.get(`/public/products?page=${page}&size=${size}`);
            return response.data.data.products;
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to fetch products';
            showToast(errorMessage, 'error');
        }
    });
};

export const useFetchProductById = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await api.get(`/public/products/${id}`);
            return response.data.data.product;
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to fetch product';
            showToast(errorMessage, 'error');
        }
    });
};

export const useFetchProductsByCategory = (category, page = 0, size = 10) => {
    return useQuery({
        queryKey: ['products', category, page, size],
        queryFn: async () => {
            const response = await api.get(`/public/products/category/${category}`, { params: { page, size } });
            return response.data.data.products;
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to fetch products by category';
            showToast(errorMessage, 'error');
        }
    });
};
