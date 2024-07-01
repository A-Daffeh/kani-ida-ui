import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const states = [
  { name: "Alabama", code: "AL" },
  { name: "Alaska", code: "AK" },
  // ... (remaining states)
];

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [viewStatus, setViewStatus] = useState("login");
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [userRegister, setUserRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  const handleClose = () => setShow(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    if (name in userRegister.address) {
      setUserRegister((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setUserRegister((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    console.log("User Login", userLogin);
  };

  const handleUserRegistration = (e) => {
    e.preventDefault();
    console.log("User Registration", userRegister);
  };

  const [activeLink, setActiveLink] = useState("banner");

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
              <button onClick={() => setShow(true)} className="vvd">
                <span>Login</span>
              </button>
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
            <form onSubmit={handleUserLogin}>
              <div className="form-group text-dark m-2">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  name="email"
                  value={userLogin.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  name="password"
                  value={userLogin.password}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="form-check mb-3 d-flex justify-content-between">
                <span>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMeCheckbox"
                    name="rememberMe"
                    checked={userLogin.rememberMe}
                    onChange={handleLoginChange}
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
            <form onSubmit={handleUserRegistration}>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerFullName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerFullName"
                  name="fullName"
                  value={userRegister.fullName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="registerEmail"
                  name="email"
                  value={userRegister.email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword"
                  name="password"
                  value={userRegister.password}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerStreet">Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerStreet"
                  name="street"
                  value={userRegister.address.street}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerCity">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerCity"
                  name="city"
                  value={userRegister.address.city}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerState">State</label>
                <select
                  className="form-control"
                  id="registerState"
                  name="state"
                  value={userRegister.address.state}
                  onChange={handleRegisterChange}
                  required
                >
                  {states.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="registerPostalCode">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerPostalCode"
                  name="postalCode"
                  value={userRegister.address.postalCode}
                  onChange={handleRegisterChange}
                  required
                />
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
            <form>
              <div className="form-group text-dark m-2">
                <label htmlFor="forgotPasswordEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="forgotPasswordEmail"
                  name="email"
                  value={userLogin.email}
                  onChange={handleLoginChange}
                  required
                />
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
