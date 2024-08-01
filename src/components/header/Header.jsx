import React from "react";
import PropTypes from "prop-types";
import './Header.css';
import { useSelector } from "react-redux";

function Header({ pageTitle }) {
  const user = useSelector((state) => state.auth.user.data.authResponse.user);

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 className="text-dark">{pageTitle}</h1>
        <p className="text-dark">Welcome back, {user?.fullName}</p>
      </div>
      <div className="d-flex align-items-center">
        <div className="search-bar mr-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for your item"
          />
        </div>
        <div className="d-flex align-items-center text-right">
          <div className="avatar-group">
            <img src={user?.imageUrl} alt="Profile" className="profile-image" />
          </div>
          <div className="ml-2">
            <h5 className="text-dark">{user?.fullName}</h5>
            <p className="text-dark">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
