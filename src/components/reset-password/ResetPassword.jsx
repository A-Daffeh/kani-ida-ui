import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NavBar from '../navbar/NavBar';
import axios from 'axios';
import './ResetPassword.css';

const ResetPassword = () => {
    const navigate = useNavigate();

    const {
        register: registerResetPassword,
        handleSubmit: handleSubmitResetPassword,
        formState: { errors: resetErrors },
        watch,
    } = useForm();

    const password = watch("password");

    const onSubmitResetPassword = async (data) => {
        try {
            // const response = await axios.post('https://kaniidaandbeyond.com/auth/reset/password', data);
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
            <div className='resetPassword' id='resetPassword'>
                <h2 className="text-danger text-center my-5">Reset Password</h2>
                <form onSubmit={handleSubmitResetPassword(onSubmitResetPassword)}>
                    <div className="form-group text-dark m-2">
                    <label className='form-label' htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="registerPassword"
                        {...registerResetPassword("password", {
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
                    {resetErrors.password && (
                        <span style={{ color: "red" }}>
                            {resetErrors.password.message}
                        </span>
                    )}
                    </div>
                    <div className="form-group text-dark m-2">
                    <label className='form-label' htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="registerPassword"
                        {...registerResetPassword("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) => value === password || "Passwords do not match",
                        })}
                    />
                    {resetErrors.confirmPassword && (
                        <span style={{ color: "red" }}>
                            {resetErrors.confirmPassword.message}
                        </span>
                    )}
                    </div>
                    <span className="forgotpass-login mt-5">
                        <button className="btn btn-danger" type="submit">
                            Reset
                        </button>
                    </span>
                </form>
            </div>
            </div>
        </>
    )
}

export default ResetPassword;