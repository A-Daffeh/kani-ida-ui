import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { getCurrentUser } from '../../services/AuthService'; // Import the getCurrentUser function
import { useSelector } from "react-redux";

const  ViewAdminProfile  = () => {
    const user = useSelector((state) => state.auth.user);
    const currentUser = user.data.authResponse.user;

    const navigate = useNavigate();
   
    const handleReturn = () => {
        navigate("/dashboard");
    };

    console.log(user);
    return (
        <>
            <Header pageTitle="User Profile" />
            <div className="container form-container">
                <div className="register" id="register">
                    <h2 className="text-danger text-center my-5">View Profile</h2>

                    <div className="row g-3">
                        <div className="col-12 text-dark">
                            <h5>Name</h5>
                            <p className="form-control">{currentUser.fullName}</p>
                        </div>
                        <div className="col-md-6 text-dark">
                            <h5>Email</h5>
                            <p className="form-control">{currentUser.email}</p>
                        </div>
                        <div className="col-md-6 text-dark">
                            <h5>Availability</h5>
                            <p className="form-control"> Availble </p>
                        </div>
                        <div className="col-md-6 text-dark">
                            <h5>Role</h5>
                            <p className="form-control"> Admin</p>
                        </div>
                        <div className="col-12 text-dark">
                            <h5>Description</h5>
                            <textarea className="form-control" rows="3" readOnly>a user</textarea>

                        </div>
                       
                    </div>

                    <div className="d-flex justify-content-end mt-5">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleReturn}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default ViewAdminProfile;
