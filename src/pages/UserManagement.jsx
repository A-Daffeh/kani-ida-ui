import React, { useState, useEffect, useRef } from 'react';
import Header from "../components/header/Header";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SearchBar from "../components/layouts/SearchBar";

const UserManagement = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [permissionsExpanded, setPermissionsExpanded] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setPermissionsExpanded(false); 
  };

  const handlePermissionsClick = () => {
    setPermissionsExpanded(!permissionsExpanded);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
      setPermissionsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header pageTitle="User Management" />
      <SearchBar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User Management</h2>
      </div>
      <span className="d-flex justify-content-end mb-2">
        <Link to="/new/user">
          <Button variant="light product-btn">Add new User </Button>{' '}
        </Link>
      </span>
      <table className="table">
        <thead>
          <tr className="header-border">
            <th scope="col">Full Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Joined</th>
            <th scope="col">Status</th>
            <th scope="col">Permissions</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Ida Bojang", phone: "425-212-2322", joined: "July 1st 2024", status: "Active", permission: "Admin" },
            { name: "Amadou Trawally", phone: "425-323-3456", joined: "July 1st 2024", status: "Active", permission: "User" },
            { name: "Bakary Jammeh", phone: "425-234-4389", joined: "July 2nd 2024", status: "Inactive", permission: "User" },
            { name: "Bakary Jammeh", phone: "425-214-2222", joined: "July 4th 2024", status: "Active", permission: "User" },
            { name: "Khadija Drammeh", phone: "425-445-5545", joined: "July 6th 2024", status: "Active", permission: "User" },
            { name: "Yaya Colley", phone: "425-332-2211", joined: "July 7th 2024", status: "Inactive", permission: "Admin" },
            { name: "Momodou Jallow", phone: "206-343-3422", joined: "July 7th 2024", status: "Inactive", permission: "User" },
            { name: "Musa Janneh", phone: "206-234-7578", joined: "July 7th 2024", status: "Active", permission: "User" },
            { name: "Saikou Sanyang", phone: "206-234-7578", joined: "July 7th 2024", status: "Active", permission: "User" }
          ].map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.joined}</td>
              <td>{user.status}</td>
              <td><span className={`badge badge-${user.permission.toLowerCase()}`}>{user.permission}</span></td>
              <td style={{ position: 'relative' }}>
                <button className="options-btn" onClick={() => handleDropdownClick(index)}>...</button>
                {activeDropdown === index && (
                  <div className="dropdown-menu show" ref={dropdownRef}>
                    <div className="dropdown-header" onClick={handlePermissionsClick}>
                      <span>Permissions</span> 
                      <span style={{ float: 'right', cursor: 'pointer' }}>
                        {permissionsExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                    {permissionsExpanded && (
                      <div className="permissions-options">
                        <button className="dropdown-item">Admin</button>
                        <button className="dropdown-item">User</button>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                      <input type="checkbox" id={`delete-${index}`} />
                      <label htmlFor={`delete-${index}`} style={{ marginLeft: '5px' }}>Delete User</label>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-custom">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserManagement;

