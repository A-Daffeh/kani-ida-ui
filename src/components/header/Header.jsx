import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import './Header.css'; // Ensure this contains the necessary styles
import { useSelector } from "react-redux";
import { FaChevronDown } from 'react-icons/fa'; // Importing FontAwesome down arrow icon
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation

function Header({ pageTitle }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate(); // Initialize navigate hook
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef(null);

  const fullName = user?.data?.authResponse?.user?.fullName || "Ida Bojang";
  const email = user?.data?.authResponse?.user?.email || "empressjagne@gmail.com";

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle click outside the dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const goToProfile = () => {
    navigate(`/admin/view/profile`);
    setDropdownOpen(false); // Close dropdown after navigating
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 className="text-dark">{pageTitle}</h1>
        <p className="text-dark">Welcome back, {fullName}</p>
      </div>
      <div className="d-flex align-items-center" style={{ justifyContent: 'flex-end' }}>
        <div className="d-flex align-items-center text-right">
          <div className="avatar-group" style={{ position: 'relative' }}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
              alt="Profile" 
              className="profile-image" 
              onClick={toggleDropdown} // Toggle dropdown on click
              style={{ cursor: 'pointer' }}
            />
            <div className="ml-2 d-flex flex-column" style={{ cursor: 'pointer' }}>
              <h5 className="text-dark mb-0" onClick={toggleDropdown}>
                {fullName}
                <FaChevronDown style={{ marginLeft: '5px' }} />
              </h5>
              <p className="text-dark" style={{ marginBottom: '0' }}>{email}</p>
            </div>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="dropdown-menu show" ref={dropdownRef} style={{ position: 'absolute', top: '100%', right: '0', zIndex: '1000', background: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
                <button className="dropdown-item" onClick={goToProfile}>
                  View Profile
                </button>
                <button className="dropdown-item" onClick={() => alert('Logout functionality here')}>
                  Logout
                </button>
              </div>
            )}
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
