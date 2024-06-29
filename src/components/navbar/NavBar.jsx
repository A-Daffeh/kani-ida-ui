import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import './NavBar.css';
import { assets } from '../../assets/assets';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const NavBar = () => {
    // i first need to initalize the modal with the modal i think should be shown first
    const [show, setShow] = useState(false); // state variable for the login form after the button is clicked, it will change the state to true from its being false thus, rendering the login form
   const [isLogin, setIsLogin] = useState(true); // this usestate true for login form, since its picking up from when the login modal is shown

    const handleClose = () => setShow(false); // handleClose method  means to show the modal when its clicked 

    const toggleForm = () => {
        setIsLogin(!isLogin); // when the register link is clicked, the login modal would go away
    }
   
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
                    <Modal.Title>{isLogin ? 'Log in' : 'Sign up'}</Modal.Title> {/* what this does is it checks if islogin is true, if it is, show the log in modal, if not show the sign up modal */ }
                </Modal.Header>
                <div className="container-fluid mb-4">
                    <Form className="form">
                        {/* here the modal will be adjusted to display different content based on whether isLogin' is true or false 
                        you use conditional rendering to decide which content will be rendered , if its true it will show  the form will show the login stuff, if not, it will 

                        */}
                        {/* its purpuse here is to conditionally render the content of the modal based on whether the user is in login or signup mode */}
                        {isLogin ? ( 
                            <>
                            {/* show the login modal */}
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="form-text" placeholder="Username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group>
                            <span className="d-flex justify-content-end">
                                <a className="forgot-password" href="#">Forgot password?</a>
                            </span>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicCheckbox" />
                        <Form.Check className="checkbox-text mb-5" type="checkbox" label="Remember me" />


                        <span className="forgotpass-login "> 
                                <Button variant="success" type="submit">Login</Button> 
                                <a className="forgot-password mb-0" href="#"  onClick={toggleForm}>Don't have an account? Sign up </a>
                            </span>
                            </>

                  
                        ) : (  
                            <>
                           <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="form-text" placeholder="Full Name" />
                        </Form.Group>
                       
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Control type="form-text" placeholder="Phone Number" />
                        </Form.Group>
                        <span className="forgotpass-login">
                         <Button variant="success" type="submit">Sign Up</Button>
                         <a className="forgot-password mb-0" href="#" onClick={toggleForm}>Already have an account? Log in</a>
                                </span>
                        

                       
                       
                            </>
                    
                        )}
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default NavBar;

{/* if you want two elements to be in the same line but with space between the two use space-between and make sure the two elements are on the same line */ }