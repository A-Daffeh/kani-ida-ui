import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import "./NavBar.css";
import { assets } from "../../assets/assets";

const states = [
  { name: "Alabama", code: "AL" },
  { name: "Alaska", code: "AK" },
  { name: "Arizona", code: "AZ" },
  { name: "Arkansas", code: "AR" },
  { name: "California", code: "CA" },
  { name: "Colorado", code: "CO" },
  { name: "Connecticut", code: "CT" },
  { name: "Delaware", code: "DE" },
  { name: "Florida", code: "FL" },
  { name: "Georgia", code: "GA" },
  { name: "Hawaii", code: "HI" },
  { name: "Idaho", code: "ID" },
  { name: "Illinois", code: "IL" },
  { name: "Indiana", code: "IN" },
  { name: "Iowa", code: "IA" },
  { name: "Kansas", code: "KS" },
  { name: "Kentucky", code: "KY" },
  { name: "Louisiana", code: "LA" },
  { name: "Maine", code: "ME" },
  { name: "Maryland", code: "MD" },
  { name: "Massachusetts", code: "MA" },
  { name: "Michigan", code: "MI" },
  { name: "Minnesota", code: "MN" },
  { name: "Mississippi", code: "MS" },
  { name: "Missouri", code: "MO" },
  { name: "Montana", code: "MT" },
  { name: "Nebraska", code: "NE" },
  { name: "Nevada", code: "NV" },
  { name: "New Hampshire", code: "NH" },
  { name: "New Jersey", code: "NJ" },
  { name: "New Mexico", code: "NM" },
  { name: "New York", code: "NY" },
  { name: "North Carolina", code: "NC" },
  { name: "North Dakota", code: "ND" },
  { name: "Ohio", code: "OH" },
  { name: "Oklahoma", code: "OK" },
  { name: "Oregon", code: "OR" },
  { name: "Pennsylvania", code: "PA" },
  { name: "Rhode Island", code: "RI" },
  { name: "South Carolina", code: "SC" },
  { name: "South Dakota", code: "SD" },
  { name: "Tennessee", code: "TN" },
  { name: "Texas", code: "TX" },
  { name: "Utah", code: "UT" },
  { name: "Vermont", code: "VT" },
  { name: "Virginia", code: "VA" },
  { name: "Washington", code: "WA" },
  { name: "West Virginia", code: "WV" },
  { name: "Wisconsin", code: "WI" },
  { name: "Wyoming", code: "WY" },
];

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [viewStatus, setViewStatus] = useState("login");
  const [activeLink, setActiveLink] = useState("banner");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(""); // State to hold the error message

  const navigate = useNavigate();
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors },
  } = useForm();

  const {
    register: registerForgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    formState: { errors: forgotErrors },
  } = useForm();

  useEffect(() => {
    // Check if user is authenticated by checking the presence of the auth cookies
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key.trim()] = value;
      return acc;
    }, {});

    if (cookies['access-token']) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleClose = () => setShow(false);

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

  const onSubmitLogin = async (data) => {
    try {
      const response = await axios.post('http://localhost:8082/auth/login', data, { withCredentials: true });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setShow(false);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        console.log('Error response:', error.response);
        if (error.response.data.code === 400) {
          setLoginError("Incorrect username or password");
        } else {
          setLoginError("An error occurred. Please try again later.");
        }
      } else {
        console.log('Error', error); 
        setLoginError("An error occurred. Please try again later.");
      }
    }
  };

  const onSubmitRegister = async (data) => {
    try {
      const response = await axios.post('http://localhost:8082/auth/register', data);
      if (response.status === 200) {
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitForgotPassword = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:8082/auth/reset/password', data);
      console.log(response.data);
    } catch (error) {
      console("Error: ", error);
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    navigate('/');
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
                className={
                  activeLink === "#banner"
                    ? "active navbar-link"
                    : "navbar-link"
                }
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#about"
                className={
                  activeLink === "#about" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("#about")}
              >
                About
              </Nav.Link>
              <NavDropdown title="Products" id="basic-nav-dropdown">
                <NavDropdown.Item
                  href="/products/savory"
                  className="prod-category"
                >
                  Savory & Seasoning
                </NavDropdown.Item>

                <NavDropdown.Item
                  href="/products/spices"
                  className="prod-category"
                >
                  Spices
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                href="/contact"
                className={
                  activeLink === "#" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("#")}
              >
                Contact
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="#">
                  <FontAwesomeIcon icon={faMagnifyingGlass} alt="Search" />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faCartShopping} alt="Add to Cart" />
                </a>
              </div>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="vvd">
                  <span>Logout</span>
                </button>
              ) : (
                <button onClick={() => setShow(true)} className="vvd">
                  <span>Login</span>
                </button>
              )}
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={show}
        onHide={handleClose}
        style={{ zIndex: 9999 }}
        className=""
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title style={{ fontFamily: "Great Vibes" }}>
            {viewStatus === "login" && "Login"}
            {viewStatus === "register" && "Register"}
            {viewStatus === "forgot" && "Forgot Password"}
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid mb-4">
          {viewStatus === "login" && (
            <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
              {loginError && (
                <div className="alert alert-danger" role="alert">
                  {loginError}
                </div>
              )}
              <div className="form-group text-dark m-2">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  {...registerLogin("email", { required: true })}
                />
                {loginErrors.email && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  {...registerLogin("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 12,
                      message: "Password must be no more than 12 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])/,
                      message: "Password must contain at least one letter",
                    },
                  })}
                />
                {loginErrors.password && (
                  <span style={{ color: "red" }}>
                    {loginErrors.password.message}
                  </span>
                )}
              </div>

              <div className="form-check mb-3 d-flex justify-content-between">
                <span>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMeCheckbox"
                    {...registerLogin("rememberMe")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="rememberMeCheckbox"
                  >
                    Remember me
                  </label>
                </span>
                <span>
                  <a
                    className="forgot-password"
                    href="#"
                    onClick={() => setViewStatus("forgot")}
                  >
                    Forgot password?
                  </a>
                </span>
              </div>
              <span className="forgotpass-login">
                <button className="btn btn-success" type="submit">
                  Login
                </button>
                <span className="have-account">
                  Don't have an account?{" "}
                  <a
                    className="forgot-password mb-0"
                    href="#"
                    onClick={() => setViewStatus("register")}
                  >
                    Register
                  </a>
                </span>
              </span>
            </form>
          )}
          {viewStatus === "register" && (
            <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerFullName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerFullName"
                  {...registerRegister("fullName", { required: true })}
                />
                {registerErrors.fullName && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="registerEmail"
                  {...registerRegister("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {registerErrors.email && (
                  <span style={{ color: "red" }}>
                    {registerErrors.email.message}
                  </span>
                )}
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword"
                  {...registerRegister("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 12,
                      message: "Password must be no more than 12 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])/,
                      message: "Password must contain at least one letter",
                    },
                  })}
                />
                {registerErrors.password && (
                  <span style={{ color: "red" }}>
                    {registerErrors.password.message}
                  </span>
                )}
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerStreet">Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerStreet"
                  {...registerRegister("address.street", { required: true })}
                />
                {registerErrors.address?.street && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerCity">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerCity"
                  {...registerRegister("address.city", { required: true })}
                />
                {registerErrors.address?.city && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerState">State</label>
                <select
                  className="form-control"
                  id="registerState"
                  {...registerRegister("address.state", { required: true })}
                >
                  {states.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {registerErrors.address?.state && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerPostalCode">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerPostalCode"
                  {...registerRegister("address.postalCode", {
                    required: "Postal Code is required",
                    pattern: {
                      value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                      message: "postal code format is numbers only",
                    },
                    minLength: {
                      value: 5,
                      message: "Postal code must be at least 5 characters",
                    },

                    maxLength: {
                      value: 5,
                      message: "Postal code must be no more than 5 characters",
                    },
                  })}
                />
                {registerErrors.address?.postalCode && (
                  <span style={{ color: "red" }}>
                    {registerErrors.address?.postalCode.message}
                  </span>
                )}
              </div>
              <span className="forgotpass-login">
                <button className="btn btn-success" type="submit">
                  Register
                </button>
                <span className="have-account">
                  Already have an account?{" "}
                  <a
                    className="forgot-password mb-0"
                    href="#"
                    onClick={() => setViewStatus("login")}
                  >
                    Login
                  </a>
                </span>
              </span>
            </form>
          )}
          {viewStatus === "forgot" && (
            <form onSubmit={handleSubmitForgotPassword(onSubmitForgotPassword)}>
              <div className="form-group text-dark m-2">
                <label htmlFor="forgotPasswordEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="forgotPasswordEmail"
                  {...registerForgotPassword("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {forgotErrors.email && (
                  <span style={{ color: "red" }}>
                    {forgotErrors.email.message}
                  </span>
                )}
              </div>
              <span className="forgotpass-login">
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
                <span className="have-account">
                  Remembered your password?{" "}
                  <a
                    className="forgot-password mb-0"
                    href="#"
                    onClick={() => setViewStatus("login")}
                  >
                    Login
                  </a>
                </span>
              </span>
            </form>
          )}
        </div>
      </Modal>
    </>
  );
};

export default NavBar;
