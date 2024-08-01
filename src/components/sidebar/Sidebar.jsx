import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/AuthActions";
import { showToast } from "../layouts/Toast";

function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser()).unwrap();
      if (response.code === 200) {
        window.location.href = "/login";
        showToast("Logout successful", "success");
      }
    } catch (error) {
      showToast(error, "error");
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
        <li className={`nav-item ${currentPath === '/products' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/products">
            Products
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/product/category' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/product/category">
           Product Categories
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/user/management' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/user/management">
            User Management
          </Link>
        </li>
        <li className={`nav-item ${currentPath === '/ordered/products' ? 'active' : ''}`}>
          <Link className="nav-link text-white" to="/ordered/products">
            Ordered Products
          </Link>
        </li>
      </ul>
      <ul className="nav flex-column">
        <li className="nav-item mt-auto">
          <Link className="nav-link text-white" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
