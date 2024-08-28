import React, { useState } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from 'react-router-dom';
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { showToast } from "../layouts/Toast";
import { assets } from "../../assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { useFetchCart } from "../../services/CartService";
import { logout } from "../../services/AuthService";
import { clearUser } from '../config/AuthSlice';

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("banner");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // To handle logout

  const userId = useSelector((state) => state.auth.user?.data.authResponse.user.id);
  const { data: cart } = useFetchCart(userId);
  const cartItemCount = cart?.cartItems.length || 0;

  const onUpdateActiveLink = (link) => {
    if (window.location.pathname === "/") {
      if (link === "#about") {
        document.querySelector(link).scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      window.location.href = "/";
    }
    setActiveLink(link);
  };

  const handleCartClick = () => {
    if (!userId) {
      showToast("Login to see items in your cart", "warning");
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

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
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={assets.logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/"
                className={activeLink === "#banner" ? "active navbar-link" : "navbar-link"}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#about"
                className={activeLink === "#about" ? "active navbar-link" : "navbar-link"}
                onClick={() => onUpdateActiveLink("#about")}
              >
                About
              </Nav.Link>
              <NavDropdown title="Products" id="basic-nav-dropdown">
                <NavDropdown.Item href="/products/savory" className="prod-category">
                  Savory & Seasoning
                </NavDropdown.Item>
                <NavDropdown.Item href="/products/spices" className="prod-category">
                  Spices
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                href="/contact"
                className={activeLink === "#" ? "active navbar-link" : "navbar-link"}
                onClick={() => onUpdateActiveLink("#")}
              >
                Contact
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <Link to="#" className="soc-icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} alt="Search" />
                </Link>
                <button onClick={handleCartClick} className="soc-icon btn btn-link p-0">
                  <FontAwesomeIcon icon={faCartShopping} alt="Add to Cart" />
                  {cartItemCount > 0 && <span className="cart-count text-white">{cartItemCount}</span>}
                </button>
              </div>
              {userId ? (
                <NavDropdown title="Settings" id="settings-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link className="vvd" to="/login">
                  Login
                </Link>
              )}
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
