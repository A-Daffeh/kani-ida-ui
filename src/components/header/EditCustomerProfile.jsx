import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import NavBar from "../navbar/NavBar";

import { showToast } from "../layouts/Toast"; 

const EditCustomerProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const currentUser = user.data.authResponse.user;
  const navigate = useNavigate();


  const [profileData, setProfileData] = useState({
    fullName: currentUser.fullName,
    email: currentUser.email,
    description: currentUser.description || "",
  });

  const queryClient = useQueryClient();

 
  const { mutate: updateUserProfile, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/admin/users/${currentUser.id}/profile`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", currentUser.id]); 
      showToast("Profile updated successfully", "success");
      navigate("/"); 
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Failed to update profile";
      showToast(errorMessage, "error");
    },
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(profileData);
  };

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <div className="container form-container">
        <div className="register" id="register">
   
          <div className="d-flex justify-content-between align-items-center my-5">
            <h2 className="text-danger">Edit Profile</h2>
            
          </div>

          <form onSubmit={handleSaveProfile}>
            <div className="row g-3">
             
              <div className="col-md-6 text-dark">
                <h5>Name</h5>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 text-dark">
                <h5>Email</h5>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Editable Description */}
              <div className="col-12 text-dark">
                <h5>Description</h5>
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={profileData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-5">
       
              <button className="btn btn-danger" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-secondary" type="button" onClick={handleReturn}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCustomerProfile;
