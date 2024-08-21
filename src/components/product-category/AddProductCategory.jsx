import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../header/Header';
import { useAddCategory } from '../../services/ProductCategoryService';
import { showToast } from '../layouts/Toast';

const AddProductCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { mutate: addCategory, isLoading, error } = useAddCategory();

    const onSubmit = async (data) => {
        addCategory(data, {
            onSuccess: () => {
                navigate('/product/category');
            },
            onError: (error) => {
                console.error('Failed to create category:', error);
            }
        });
    };

    return (
        <>
            <Header pageTitle="Products Categories" />
            <div className="container form-container">
                <div className="register" id="register">
                    <h2 className="text-danger text-center my-5">Add Product Category</h2>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>{error.message}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="col-md-12 text-dark">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" {...register('name', { required: true })} />
                                {errors.name && <span style={{ color: 'red' }}>This field is required</span>}
                            </div>
                            <div className="col-md-12 text-dark">
                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea className="form-control" id="description" rows="4" {...register('description', { required: true })}></textarea>
                                {errors.description && <span style={{ color: 'red' }}>This field is required</span>}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-5">
                            <button className="btn btn-danger" type="submit">Create</button>
                            <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProductCategory;
