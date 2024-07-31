import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/AuthActions';
import NavBar from '../navbar/NavBar';
import './Login.css';

const Login = () => {
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitLogin = (data) => {
        dispatch(loginUser(data));
    };

    useEffect(() => {
        if (authState.user) {
            navigate('/dashboard');
        }
    }, [authState.user, navigate]);

    useEffect(() => {
        if (authState.error) {
            if (typeof authState.error === 'object') {
                setLoginError(authState.error.message || 'An error occurred');
            } else {
                setLoginError(authState.error);
            }
        }
    }, [authState.error]);

    return (
        <>
            <NavBar />
            <div className="container">
                <div className='login' id='login'>
                    <h2 className="text-danger text-center my-5">Login</h2>
                    <form onSubmit={handleSubmit(onSubmitLogin)}>
                        {loginError && (
                            <div className="alert alert-danger" role="alert">
                                {loginError}
                            </div>
                        )}
                        <div className="form-group text-dark m-2">
                            <label className='form-label' htmlFor="inputEmail">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span style={{ color: "red" }}>This field is required</span>
                            )}
                        </div>
                        <div className="form-group text-dark m-2">
                            <label className='form-label' htmlFor="inputPassword">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])/,
                                        message: "Password must contain at least one letter",
                                    },
                                })}
                            />
                            {errors.password && (
                                <span style={{ color: "red" }}>
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <div className="form-check mb-3 d-flex justify-content-between">
                            <span>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="rememberMeCheckbox"
                                    {...register("rememberMe")}
                                />
                                <label className="form-check-label" htmlFor="rememberMeCheckbox">
                                    Remember me
                                </label>
                            </span>
                            <span>
                                <Link className="forgot-password" to="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </span>
                        </div>
                        <span className="forgotpass-login mt-5">
                            <button className="btn btn-danger" type="submit">
                                Login
                            </button>
                            <span className="have-account">
                                Don't have an account?{" "}
                                <Link className="forgot-password mb-0" to="/register">
                                    Register
                                </Link>
                            </span>
                        </span>
                    </form>
                </div>
            </div>            
        </>
    );
}

export default Login;
