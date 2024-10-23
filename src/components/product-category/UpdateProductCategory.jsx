import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../header/Header';
import { useFetchCategoryById, useUpdateCategory } from '../../services/ProductCategoryService';

const UpdateProductCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: category, isLoading: isCategoryLoading, error: fetchError } = useFetchCategoryById(id);
    const { mutate: updateCategory, isLoading: isUpdateLoading, error: updateError } = useUpdateCategory();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (category) {
            setValue('name', category.name);
            setValue('description', category.description);
        }
    }, [category, setValue]);

    const onSubmit = async (data) => {
        updateCategory({ id, updatedCategory: data }, {
            onSuccess: () => {
                navigate('/product/category');
            },
            onError: (error) => {
                console.error('Failed to update category:', error);
            }
        });
    };

    if (isCategoryLoading) return <p>Loading...</p>;
    if (fetchError) return <p>{fetchError.message}</p>;

    return (
        <>
            <Header pageTitle="Update Product Category" />
            <div className="container form-container">
                <div className="register" id="register">
                    <h2 className="text-danger text-center my-5">Update Product Category</h2>
                    {isUpdateLoading && <p>Updating...</p>}
                    {updateError && <p>{updateError.message}</p>}
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
                            <button className="btn btn-danger" type="submit">Update</button>
                            <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateProductCategory;
