import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../header/Header';
import { useFetchProductById, useUpdateProduct } from '../../services/ProductService';
import { useFetchCategories } from '../../services/ProductCategoryService';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: product, isLoading: isProductLoading, error: fetchError } = useFetchProductById(id);
    const { mutate: updateProduct, isLoading: isUpdateLoading, error: updateError } = useUpdateProduct();
    const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useFetchCategories({ page: 0, size: 100 });
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    useEffect(() => {
        if (product) {
            if (getValues('name') !== product.name) setValue('name', product.name);
            if (getValues('description') !== product.description) setValue('description', product.description);
            if (getValues('price') !== product.price) setValue('price', product.price);
            if (getValues('availability') !== product.availability.toString()) setValue('availability', product.availability.toString());
            if (getValues('quantity') !== product.quantity) setValue('quantity', product.quantity);
            if (getValues('category') !== product.productCategory.id) setValue('category', product.productCategory.id);
        }
    }, [product, setValue, getValues]);

    const onSubmit = async (data) => {
        updateProduct({ id, data }, {
            onSuccess: () => {
                navigate('/products');
            },
            onError: (error) => {
                console.error('Failed to update product:', error);
            }
        });
    };

    if (isProductLoading || isCategoriesLoading) return <p>Loading...</p>;
    if (fetchError) return <p>{fetchError.message}</p>;
    if (categoriesError) return <p>{categoriesError.message}</p>;

    return (
        <>
            <Header pageTitle="Update Product" />
            <div className="container form-container">
                <div className="register" id="register">
                    <h2 className="text-danger text-center my-5">Update Product</h2>
                    {isUpdateLoading && <p>Updating...</p>}
                    {updateError && <p>{updateError.message}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="col-12 text-dark">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" {...register('name', { required: true })} />
                                {errors.name && <span style={{ color: 'red' }}>This field is required</span>}
                            </div>
                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="price">Price</label>
                                <input type="number" className="form-control" id="price" step="0.01" {...register('price', { required: true })} />
                                {errors.price && <span style={{ color: 'red' }}>This field is required</span>}
                            </div>
                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="availability">Availability</label>
                                <select className="form-control" id="availability" {...register('availability', { required: true })}>
                                    <option value="true">Available</option>
                                    <option value="false">Not Available</option>
                                </select>
                                {errors.availability && <span style={{ color: 'red' }}>This field is required</span>}
                            </div>
                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="quantity">Quantity</label>
                                <input type="number" className="form-control" id="quantity" {...register('quantity', { required: true })} />
                                {errors.quantity && <span style={{ color: 'red' }}>This field is required</span>}
                            </div>
                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="category">Category</label>
                                <select className="form-control" id="category" {...register('category', { required: true })}>
                                    {categories && categories.content.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <span style={{ color: 'red' }}>This field is required</span>}
                            </div>
                            <div className="col-12 text-dark">
                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea className="form-control" id="description" rows="4" {...register('description', { required: true })}></textarea>
                                {errors.description && <span style={{ color: 'red' }}>This field is required</span>}
                            </div>
                            <div className="col-12 text-dark">
                                <label className="form-label" htmlFor="file">Product Image</label>
                                <input type="file" className="form-control" id="file" {...register('file')} />
                                {product?.imageUrl && (
                                    <div className="mt-2">
                                        <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-5">
                            <button className="btn btn-danger" type="submit">Update</button>
                            <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateProduct;
