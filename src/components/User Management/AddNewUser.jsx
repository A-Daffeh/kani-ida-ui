import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../header/Header';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { register as createUser } from '../../services/AuthService';
import { showToast } from '../layouts/Toast';

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

const AddNewUser = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await createUser(data);
            showToast("User created successfully!", "success");
            navigate("/user/management");
        } catch (error) {
            showToast("User creation failed", "error");
        }
    };

    const password = watch("password");

    return (
        <>
            <Header pageTitle="Add New User" />
            <div className="container">
                    <h2 className="text-danger text-center">Add New User</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            {/* Full Name */}
                            <div className="col-md-12 text-dark">
                                <label className="form-label" htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullName"
                                    {...register('fullName', { required: "Full Name is required" })}
                                />
                                {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName.message}</span>}
                            </div>

                            {/* Email Address */}
                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                                {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
                            </div>

                            {/* Role Selection */}
                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="role">Role</label>
                                <select
                                    className="form-select"
                                    id="role"
                                    {...register('role', { required: "Role is required" })}
                                >
                                    <option value="">Select Role</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                    <option value="ROLE_USER">User</option>
                                </select>
                                {errors.role && <span style={{ color: 'red' }}>{errors.role.message}</span>}
                            </div><div className="col-md-6 text-dark position-relative">
                                <label className="form-label" htmlFor="registerPassword">Password</label>
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="registerPassword"
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
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        className="position-absolute"
                                        style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </div>
                                {errors.password && (
                                    <span style={{ color: "red" }}>
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-md-6 text-dark position-relative">
                                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                <div className="position-relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="form-control"
                                        id="confirmPassword"
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: (value) => value === password || "Passwords do not match"
                                        })}
                                    />
                                    <FontAwesomeIcon
                                        icon={showConfirmPassword ? faEyeSlash : faEye}
                                        className="position-absolute"
                                        style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                </div>
                                {register.confirmPassword && (
                                    <span style={{ color: "red" }}>
                                        {errors.confirmPassword.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-md-12 text-dark">
                                <label className="form-label" htmlFor="registerStreet">Street</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registerStreet"
                                    {...register("address.street", { required: true })}
                                />
                                {errors.address?.street && (
                                    <span style={{ color: "red" }}>This field is required</span>
                                )}
                            </div>
                            <div className="col-md-6 text-dark">
                                <label className="form-label" htmlFor="registerCity">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registerCity"
                                    {...register("address.city", { required: true })}
                                />
                                {errors.address?.city && (
                                    <span style={{ color: "red" }}>This field is required</span>
                                )}
                            </div>
                            <div className="col-md-4 text-dark">
                                <label className="form-label" htmlFor="registerState">State</label>
                                <select
                                    className="form-select"
                                    id="registerState"
                                    {...register("address.state", { required: true })}
                                >
                                    {states.map((state) => (
                                        <option key={state.code} value={state.code}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.address?.state && (
                                    <span style={{ color: "red" }}>This field is required</span>
                                )}
                            </div>
                            <div className="col-md-2 text-dark">
                                <label className="form-label" htmlFor="registerPostalCode">Postal Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registerPostalCode"
                                    {...register("address.postalCode", {
                                        required: "Postal Code is required",
                                        pattern: {
                                            value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                                            message: "Postal code format is numbers only",
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
                                {errors.address?.postalCode && (
                                    <span style={{ color: "red" }}>
                                        {errors.address?.postalCode.message}
                                    </span>
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
        </>
    );
};

export default AddNewUser;
