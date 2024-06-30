import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import './NavBar.css';
import { assets } from '../../assets/assets';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const states = [
    { name: 'Alabama', code: 'AL' },
    { name: 'Alaska', code: 'AK' },
    { name: 'Arizona', code: 'AZ' },
    { name: 'Arkansas', code: 'AR' },
    { name: 'California', code: 'CA' },
    { name: 'Colorado', code: 'CO' },
    { name: 'Connecticut', code: 'CT' },
    { name: 'Delaware', code: 'DE' },
    { name: 'Florida', code: 'FL' },
    { name: 'Georgia', code: 'GA' },
    { name: 'Hawaii', code: 'HI' },
    { name: 'Idaho', code: 'ID' },
    { name: 'Illinois', code: 'IL' },
    { name: 'Indiana', code: 'IN' },
    { name: 'Iowa', code: 'IA' },
    { name: 'Kansas', code: 'KS' },
    { name: 'Kentucky', code: 'KY' },
    { name: 'Louisiana', code: 'LA' },
    { name: 'Maine', code: 'ME' },
    { name: 'Maryland', code: 'MD' },
    { name: 'Massachusetts', code: 'MA' },
    { name: 'Michigan', code: 'MI' },
    { name: 'Minnesota', code: 'MN' },
    { name: 'Mississippi', code: 'MS' },
    { name: 'Missouri', code: 'MO' },
    { name: 'Montana', code: 'MT' },
    { name: 'Nebraska', code: 'NE' },
    { name: 'Nevada', code: 'NV' },
    { name: 'New Hampshire', code: 'NH' },
    { name: 'New Jersey', code: 'NJ' },
    { name: 'New Mexico', code: 'NM' },
    { name: 'New York', code: 'NY' },
    { name: 'North Carolina', code: 'NC' },
    { name: 'North Dakota', code: 'ND' },
    { name: 'Ohio', code: 'OH' },
    { name: 'Oklahoma', code: 'OK' },
    { name: 'Oregon', code: 'OR' },
    { name: 'Pennsylvania', code: 'PA' },
    { name: 'Rhode Island', code: 'RI' },
    { name: 'South Carolina', code: 'SC' },
    { name: 'South Dakota', code: 'SD' },
    { name: 'Tennessee', code: 'TN' },
    { name: 'Texas', code: 'TX' },
    { name: 'Utah', code: 'UT' },
    { name: 'Vermont', code: 'VT' },
    { name: 'Virginia', code: 'VA' },
    { name: 'Washington', code: 'WA' },
    { name: 'West Virginia', code: 'WV' },
    { name: 'Wisconsin', code: 'WI' },
    { name: 'Wyoming', code: 'WY' }
];


const NavBar = () => {
    const [show, setShow] = useState(false); 
    const [isLogin, setIsLogin] = useState(true);
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });
    const [userRegister, setUserRegister] = useState({
        fullName: "",
        email: "",
        password: "",
        address: {
            street: "",
            city: "",
            state: "",
            postalCode: ""
        }
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
                    [name]: value
                }
            }));
        } else {
            setUserRegister((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleUserLogin = (e) => {
        e.preventDefault();
        console.log("User Login", userLogin);
        
    };

    const handleUserRegistration = (e) => {
        e.preventDefault();
        console.log("User Registration", userRegister);
        
    };
   
    const [activeLink, setActiveLink] = useState('banner');

    const onUpdateActiveLink = (link) => {
        if (window.location.pathname === "/") {
            if (link === '#about') {
                document.querySelector(link).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        } else {
            window.location.href = "/";
        }
        setActiveLink(link);
    }

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
                            <Nav.Link href="/" className={activeLink === '#banner' ? 'active navbar-link' : 'navbar-link' }>Home</Nav.Link>
                            <Nav.Link href="#about" className={activeLink === '#about' ? 'active navbar-link' : 'navbar-link' } onClick={() => onUpdateActiveLink('#about')}>About</Nav.Link>
                            <NavDropdown title="Products" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/products/savory" className="prod-category">
                                    Savory & Seasoning
                                </NavDropdown.Item>
                            
                                <NavDropdown.Item href="/products/spices" className="prod-category">
                                    Spices
                                </NavDropdown.Item>
                            </NavDropdown>    
                            <Nav.Link href="/contact" className={activeLink === '#' ? 'active navbar-link' : 'navbar-link' } onClick={() => onUpdateActiveLink('#')}>Contact</Nav.Link>
                        </Nav>
                        <span className="navbar-text">
                            <div className="social-icon">
                            <a href="#"><FontAwesomeIcon icon={faMagnifyingGlass} alt="Search" /></a>
                            <a href="#"><FontAwesomeIcon icon={faCartShopping} alt="Add to Cart" /></a>
                            </div>
                           <button onClick={() => setShow(true)} className="vvd"><span>Login</span></button> 
                           
                        </span>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    
            <Modal show={show} onHide={handleClose} style={{ zIndex: 9999 }} className="">
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title style={{ fontFamily: 'Great Vibes' }}>{isLogin ? 'Login' : 'Register'}</Modal.Title> 
                </Modal.Header>
                <div className="container-fluid mb-4">
                        { isLogin ? ( 
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
                                        <label className="form-check-label" htmlFor="rememberMeCheckbox">
                                            Remember me
                                        </label>
                                    </span>
                                    

                                    <span>
                                        <a className="forgot-password" href="#">Forgot password?</a>
                                    </span>
                                </div>
                                <span className="forgotpass-login">
                                    <button className="btn btn-success" type="submit">Login</button>
                                    <span className="have-account">
                                        Don't have an account?{' '}
                                        <a className="forgot-password mb-0" href="#" onClick={toggleForm}>
                                            register
                                        </a>
                                    </span>
                                </span>
                            </form>

                  
                        ) : (  
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
                                >
                                    <option value="">Select a state</option>
                                    {states.map((state) => (
                                        <option key={state.code} value={state.code}>{state.name}</option>
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
                                />
                            </div>

                            <span className="forgotpass-login">
                                <Button variant="success" type="submit">Register</Button>
                                <span className="have-account">
                                    Already have an account?{' '}
                                    <a className="forgot-password mb-0" href="#" onClick={toggleForm}>
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
}

export default NavBar;