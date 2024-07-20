import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NavBar from '../navbar/NavBar';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: loginErrors },
    } = useForm();

    const onSubmitLogin = async (data) => {
        try {
          const response = await axios.post('http://localhost:8082/auth/login', data, { withCredentials: true });
          if (response.status === 200) {
            console.log(response);
            navigate('/dashboard');
          }
        } catch (error) {
          if (error.response) {
            console.log('Error response:', error.response);
            if (error.response.data.code === 400) {
              setLoginError("Incorrect username or password");
            } else {
              setLoginError("An error occurred. Please try again later.");
            }
          } else {
            console.log('Error', error); 
            setLoginError("An error occurred. Please try again later.");
          }
        }
    };

    return (
        <>
            <NavBar />
            <div className="container">
            <div className='login' id='login'>
                <h2 className="text-danger text-center my-5">Login</h2>
                <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
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
                        {...registerLogin("email", { required: true })}
                        />
                        {loginErrors.email && (
                        <span style={{ color: "red" }}>This field is required</span>
                        )}
                    </div>
                    <div className="form-group text-dark m-2">
                        <label className='form-label' htmlFor="inputPassword">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        {...registerLogin("password", {
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
                        {loginErrors.password && (
                        <span style={{ color: "red" }}>
                            {loginErrors.password.message}
                        </span>
                        )}
                    </div>

                    <div className="form-check mb-3 d-flex justify-content-between">
                        <span>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMeCheckbox"
                            {...registerLogin("rememberMe")}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="rememberMeCheckbox"
                        >
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
    )
}

export default Login;