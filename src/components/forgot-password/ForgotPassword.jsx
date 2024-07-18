import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NavBar from '../navbar/NavBar';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const {
        register: registerForgotPassword,
        handleSubmit: handleSubmitForgotPassword,
        formState: { errors: forgotErrors },
    } = useForm();

    const onSubmitForgotPassword = async (data) => {
        console.log(data);
        try {
            const response = await axios.post('http://localhost:8082/auth/reset/password', data);
            if (response.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            console("Error: ", error);
        }
    };
    
    return (
        <>
            <NavBar />
            <div className="container">
            <div className='forgotPassword' id='forgotPassword'>
                <h2 className="text-danger text-center my-5">Forgot Password</h2>
                <form onSubmit={handleSubmitForgotPassword(onSubmitForgotPassword)}>
                    <div className="form-group text-dark m-2">
                    <label className='form-label' htmlFor="forgotPasswordEmail">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="forgotPasswordEmail"
                        {...registerForgotPassword("email", {
                        required: "This field is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                        })}
                    />
                    {forgotErrors.email && (
                        <span style={{ color: "red" }}>
                        {forgotErrors.email.message}
                        </span>
                    )}
                    </div>
                    <span className="forgotpass-login mt-5">
                    <button className="btn btn-danger" type="submit">
                        Submit
                    </button>
                    <span className="have-account">
                        Remembered your password?{" "}
                        <Link className="forgot-password mb-0" to="/login">
                            Login
                        </Link>
                    </span>
                    </span>
                </form>
            </div>
            </div>
        </>
    );
}

export default ForgotPassword;