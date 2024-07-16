import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8082/auth/logout');
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar text-white p-3 round-sidebar d-flex flex-column">
      <ul className="nav flex-column flex-grow-1">
        <li className={`nav-item ${currentPath === '/dashboard' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/product-category' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/product-category">
            Product Category
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/add-products' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/add-products">
            Products
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/user-management' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/user-management">
            User Management
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/ordered-products' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/ordered-products">
            Ordered Products
          </Link>
        </li>
      </ul>
      <ul className="nav flex-column">
        <li className="nav-item mt-auto">
          <a className="nav-link text-white" href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
