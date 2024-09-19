import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NavBar from '../navbar/NavBar';
import './Login.css';
import { showToast } from '../layouts/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { login } from '../../services/AuthService';
import { useDispatch } from 'react-redux';
import { setUser } from '../config/AuthSlice';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmitLogin = async (data) => {
        try {
            const user = await login(data);
            dispatch(setUser(user));

            showToast("Login successful", "success");
            const role = user.data.authResponse.user.role;
            if (role === 'ROLE_ADMIN' || role === 'ROLE_OWNER') {
                navigate('/dashboard');
            } else {
                navigate('/cart');
            }
        } catch (error) {
            showToast("Incorrect username/password", "error");
        }
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <div className='login' id='login'>
                    <h2 className="text-danger text-center my-5">Login</h2>
                    <form onSubmit={handleSubmit(onSubmitLogin)}>
                        <div className="form-group text-dark m-2">
                            <label className='form-label' htmlFor="inputEmail">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                {...register("email", { required: true })}
                                autoFocus
                            />
                            {errors.email && (
                                <span style={{ color: "red" }}>Email is required</span>
                            )}
                        </div>
                        <div className="form-group text-dark m-2 position-relative">
                            <label className='form-label' htmlFor="inputPassword">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="inputPassword"
                                {...register("password", {
                                    required: "Password is required"
                                })}
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="position-absolute password-toggle-icon"
                                onClick={() => setShowPassword(!showPassword)}
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
                                Don&apos;t have an account?{" "}
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

