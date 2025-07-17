import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faShoppingBag, faThList, faUser, faBox } from '@fortawesome/free-solid-svg-icons';
import { showToast } from "../layouts/Toast";
import './Sidebar.css';
import { logout } from "../../services/AuthService";
import { clearUser } from '../config/AuthSlice';

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = async () => {
    try {
      await logout();
      showToast("Logout successful", "success");
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <div className="sidebar text-white p-3 round-sidebar d-flex flex-column">
      <ul className="nav flex-column flex-grow-1">
        <li className={`nav-item ${currentPath === '/dashboard' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/dashboard">
            <FontAwesomeIcon icon={faHouse} className="me-2" />
            Dashboard
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/products' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/products">
            <FontAwesomeIcon icon={faShoppingBag} className="me-2" />
            Products
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/product/category' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/product/category">
            <FontAwesomeIcon icon={faThList} className="me-2" />
            Categories
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/user/management' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/user/management">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            User Management
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/ordered/products' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/ordered/products">
            <FontAwesomeIcon icon={faBox} className="me-2" />
            Ordered Products
          </Link>
        </li>
      </ul>
      <ul className="nav flex-column">
        <li className="nav-item mt-auto">
          <button className="nav-link text-white" onClick={handleLogout} style={{ background: 'none', border: 'none', padding: 0 }}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
