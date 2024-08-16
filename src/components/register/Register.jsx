import NavBar from "../navbar/NavBar";
import { useForm } from 'react-hook-form';
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { showToast } from "../layouts/Toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { register } from '../../services/AuthService';

const states = [
    { name: "Alabama", code: "AL" },
    { name: "Alaska", code: "AK" },
    { name: "Arizona", code: "AZ" },
    { name: "Arkansas", code: "AR" },
    { name: "California", code: "CA" },
    { name: "Colorado", code: "CO" },
    { name: "Connecticut", code: "CT" },
    { name: "Delaware", code: "DE" },
    { name: "Florida", code: "FL" },
    { name: "Georgia", code: "GA" },
    { name: "Hawaii", code: "HI" },
    { name: "Idaho", code: "ID" },
    { name: "Illinois", code: "IL" },
    { name: "Indiana", code: "IN" },
    { name: "Iowa", code: "IA" },
    { name: "Kansas", code: "KS" },
    { name: "Kentucky", code: "KY" },
    { name: "Louisiana", code: "LA" },
    { name: "Maine", code: "ME" },
    { name: "Maryland", code: "MD" },
    { name: "Massachusetts", code: "MA" },
    { name: "Michigan", code: "MI" },
    { name: "Minnesota", code: "MN" },
    { name: "Mississippi", code: "MS" },
    { name: "Missouri", code: "MO" },
    { name: "Montana", code: "MT" },
    { name: "Nebraska", code: "NE" },
    { name: "Nevada", code: "NV" },
    { name: "New Hampshire", code: "NH" },
    { name: "New Jersey", code: "NJ" },
    { name: "New Mexico", code: "NM" },
    { name: "New York", code: "NY" },
    { name: "North Carolina", code: "NC" },
    { name: "North Dakota", code: "ND" },
    { name: "Ohio", code: "OH" },
    { name: "Oklahoma", code: "OK" },
    { name: "Oregon", code: "OR" },
    { name: "Pennsylvania", code: "PA" },
    { name: "Rhode Island", code: "RI" },
    { name: "South Carolina", code: "SC" },
    { name: "South Dakota", code: "SD" },
    { name: "Tennessee", code: "TN" },
    { name: "Texas", code: "TX" },
    { name: "Utah", code: "UT" },
    { name: "Vermont", code: "VT" },
    { name: "Virginia", code: "VA" },
    { name: "Washington", code: "WA" },
    { name: "West Virginia", code: "WV" },
    { name: "Wisconsin", code: "WI" },
    { name: "Wyoming", code: "WY" },
];

const Register = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: registerErrors }, watch } = useForm();
    

    const onSubmitRegister = async (data) => {
        try {
            await register(data); // Directly call the logout function
            showToast("Registration successful!", "success");
            navigate("/login");
        } catch (error) {
            setErrorMessage(error.message || "Registration failed");
            showToast(errorMessage, "error");
        }
       
    };

    const password = watch("password");

    return (
        <>
            <NavBar />
            <div className="container">
            <div className="register" id="register">
                <h2 className="text-danger text-center my-5">Registration</h2>
                <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
                    <div className="row g-3">
                        <div className="col-md-6 text-dark">
                            <label className="form-label" htmlFor="registerFullName">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="registerFullName"
                                {...registerRegister("fullName", { required: true })}
                                autoFocus
                            />
                            {registerErrors.fullName && (
                                <span style={{ color: "red" }}>This field is required</span>
                            )}
                        </div>
                        <div className="col-md-6 text-dark">
                            <label className="form-label" htmlFor="registerEmail">Email address</label>
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
                        <div className="col-md-6 text-dark">
                            <label className="form-label" htmlFor="registerPassword">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="registerPassword"
                                {...registerRegister("password", {
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
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="position-absolute"
                                style={{ top: "45%", right: "0px", cursor: "pointer" }}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                            {registerErrors.password && (
                                <span style={{ color: "red" }}>
                                    {registerErrors.password.message}
                                </span>
                            )}
                        </div>
                        <div className="col-md-6 text-dark">
                            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                id="confirmPassword"
                                {...registerRegister("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === password || "Passwords do not match"
                                })}
                            />
                            <FontAwesomeIcon
                                icon={showConfirmPassword ? faEyeSlash : faEye}
                                className="position-absolute"
                                style={{ top: "45%", right: "10px", cursor: "pointer" }}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                            {registerErrors.confirmPassword && (
                                <span style={{ color: "red" }}>
                                    {registerErrors.confirmPassword.message}
                                </span>
                            )}
                        </div>
                        <div className="col-md-12 text-dark">
                            <label className="form-label" htmlFor="registerStreet">Street</label>
                            <input
                                type="text"
                                className="form-control"
                                id="registerStreet"
                                {...registerRegister("address.street", { required: true })}
                            />
                            {registerErrors.address?.street && (
                                <span style={{ color: "red" }}>This field is required</span>
                            )}
                        </div>
                        <div className="col-md-6 text-dark">
                            <label className="form-label" htmlFor="registerCity">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="registerCity"
                                {...registerRegister("address.city", { required: true })}
                            />
                            {registerErrors.address?.city && (
                                <span style={{ color: "red" }}>This field is required</span>
                            )}
                        </div>
                        <div className="col-md-4 text-dark">
                            <label className="form-label" htmlFor="registerState">State</label>
                            <select
                                className="form-select"
                                id="registerState"
                                {...registerRegister("address.state", { required: true })}
                            >
                                {states.map((state) => (
                                    <option key={state.code} value={state.code}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                            {registerErrors.address?.state && (
                                <span style={{ color: "red" }}>This field is required</span>
                            )}
                        </div>
                        <div className="col-md-2 text-dark">
                            <label className="form-label" htmlFor="registerPostalCode">Postal Code</label>
                            <input
                                type="text"
                                className="form-control"
                                id="registerPostalCode"
                                {...registerRegister("address.postalCode", {
                                    required: "Postal Code is required",
                                    pattern: {
                                        value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                                        message: "postal code format is numbers only",
                                    },
                                    minLength: {
                                        value: 5,
                                        message: "Postal code must be at least 5 characters",
                                    },
                                    maxLength: {
                                        value: 5,
                                        message: "Postal code must be no more than 5 characters",
                                    },
                                })}
                            />
                            {registerErrors.address?.postalCode && (
                                <span style={{ color: "red" }}>
                                    {registerErrors.address?.postalCode.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <span className="forgotpass-login mt-5">
                        <button className="btn btn-danger" type="submit">
                            Register
                        </button>
                        <span className="have-account">
                            Already have an account?{" "}
                            <Link className="forgot-password mb-0" to="/login">
                                Login
                            </Link>
                        </span>
                    </span>
                </form>
            </div>
            </div>
            
        </>
    )
}

export default Register;
