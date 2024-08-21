import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../header/Header';
import { useAddProduct } from '../../services/ProductService';
import { useFetchCategories } from '../../services/ProductCategoryService';

const AddNewProduct = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { mutate: addProduct, isLoading: isProductLoading, error: productError } = useAddProduct();
    const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useFetchCategories({ page: 0, size: 100 });

    const onSubmit = (data) => {
        addProduct(data, {
            onSuccess: () => {
                navigate('/products');
            },
            onError: (error) => {
                console.error('Failed to create product:', error);
            }
        });
    };

    return (
        <>
            <Header pageTitle="Products" />
            <div className="container form-container">
                <div className="register" id="register">
                    <h2 className="text-danger text-center my-5">Add New Product</h2>
                    {isProductLoading && <p>Loading...</p>}
                    {productError && <p>{productError.message}</p>}
                    {isCategoriesLoading && <p>Loading categories...</p>}
                    {categoriesError && <p>{categoriesError.message}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="file">Image URL</label>
                                <input type="file" className="form-control" id="file" {...register('file', { required: true })} />
                            </div>

                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" {...register('name', { required: true })} />
                            </div>

                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="price">Price $</label>
                                <input type="number" className="form-control" id="price" step="0.01" {...register('price', { required: true })} />
                            </div>

                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="availability">Availability</label>
                                <select className="form-control" id="availability" {...register('availability', { required: true })}>
                                    <option value="true">Available</option>
                                    <option value="false">Not Available</option>
                                </select>
                            </div>

                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="category">Category</label>
                                <select className="form-control" id="category" {...register('category', { required: true })}>
                                    <option value="">Select Category</option>
                                    {categories && categories.content.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="quantity">Quantity</label>
                                <input type="number" className="form-control" id="quantity" step="1" {...register('quantity', { required: true })} />
                            </div>

                            <div className="col-md-12 text-dark">
                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea className="form-control" id="description" rows="4" {...register('description', { required: true })}></textarea>
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

export default AddNewProduct;
