import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/Header';

const AddNewUser = () => {
  
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.products);

    const {
        register: registerRegister,
        handleSubmit: handleSubmitRegister,
        formState: { errors: registerErrors },
        watch
    } = useForm();

    const onSubmit = async (data) => {
        dispatch(addProduct(data));
        reset();
    };

    return (
        <>
            <Header pageTitle="Users" />
            <div className="container form-container">
                <div className="register" id="register">
                    <h2 className="text-danger text-center my-5">Add New User</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                        

                        <div className="col-md-12 text-dark">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" {...register('name', { required: true })} />
                                {errors.name && <span style={{ color: 'red' }}>This field is required</span>}
                            </div>

                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="price">
                                 Phone Number
                                </label>
                                <input type="number" className="form-control" id="price" step="0.01" {...register('phone number', { required: true })}/>
                            </div>

                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="registerEmail">
                                    Email Address
                                </label>
                                <input
                                type="email"
                                className="form-control"
                                id="registerEmail"
                                {...registerRegister("email", {
                                    required: "This field is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {registerErrors.email && (
                                <span style={{ color: "red" }}>
                                    {registerErrors.email.message}
                                </span>
                            )}
                            </div>

                                <div className="col-md-12 text-dark">
                                <label className="form-label" htmlFor="dateJoined">
                                Date Joined
                                </label>
                                <input
                                type="date"
                                className="form-control"
                                id="dateJoined"
                                {...register('dateJoined', { required: true })}
                                />
                                {errors.dateJoined && <span className="text-danger">This field is required</span>}
                                </div>


                            <div className="col-md-12 text-dark">
                                <label className="form-label" htmlFor="Permissions">
                                    Permissions
                                </label>
                                <select className="form-control" id="availability" {...register('Permissions', { required: true })}>
                                    <option value="true">Admin</option>
                                    <option value="false">User</option>
                                </select>
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
};

export default AddNewUser;