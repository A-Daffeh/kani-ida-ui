import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from "../header/Header";
import axios from 'axios';

const AddProductCategory = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors: registerErrors },
        reset } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post('http://localhost:8082/api/admin/categories/create', data);
            console.log(response.data);
            reset();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };


    return (
        <>
            <Header pageTitle="Products Categories" />
            <div className="container form-container">
                <div className="register" id="register">
                <h2 className="text-danger text-center my-5">Add Product Category</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3">

                    <div className="col-md-12 text-dark">
                        <label className="form-label" htmlFor="name">
                        Name
                        </label>
                        <input type="text" className="form-control" id="name"  
                        {...register('name', { required: true })}/>
                        {registerErrors.name && (
                            <span style={{ color: "red" }}>This field is required</span>
                        )}
                    </div>

                    <div className="col-md-12 text-dark">
                        <label className="form-label" htmlFor="description">
                        Description
                        </label>
                        <textarea className="form-control" id="description" rows="4" 
                        {...register('description', { required: true })}></textarea>
                        {registerErrors.description && (
                            <span style={{ color: "red" }}>This field is required</span>
                        )}
                    </div>
                    </div>

                    <div className="d-flex justify-content-between mt-5">
                    <button className="btn btn-danger" type="submit">
                        Create
                    </button>
                    <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>
                        Back
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </>
    );
}

export default AddProductCategory;