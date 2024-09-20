import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/AuthService"; // Import the getCurrentUser function
import { useSelector } from "react-redux";
import NavBar from "../navbar/NavBar";

const ViewCustomerAddresses = () => {
  const user = useSelector((state) => state.auth.user);
  const currentUser = user.data.authResponse.user;

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/dashboard");
  };

  console.log(user);

  // Simulating duplicates for now
  const duplicateAddresses = [
    ...currentUser.addresses,
    ...currentUser.addresses,
    ...currentUser.addresses, // Duplicating addresses to simulate more cards
  ];

  return (
    <>
      <NavBar />
      <div className="container">
        <h2 className="text-danger text-center my-5">View User Addresses</h2>

        <div className="row">
          {/* Check if addresses exist, then map through them */}
          {duplicateAddresses?.length > 0 ? (
            duplicateAddresses.map((address, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Address {index + 1}</h5>
                    <p className="card-text">Street: {address.street}</p>
                    <p className="card-text">City: {address.city}</p>
                    <p className="card-text">State: {address.state}</p>
                    <p className="card-text">Postal Code: {address.postalCode}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-link">Edit</button>
                    <button className="btn btn-link text-danger">Remove</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="form-control">No address available</p>
          )}
        </div>

        <div className="d-flex justify-content-end mt-5">
          <button className="btn btn-secondary" type="button" onClick={handleReturn}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewCustomerAddresses;
