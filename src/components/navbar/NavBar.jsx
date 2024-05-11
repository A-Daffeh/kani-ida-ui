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
    const [show, setShow] = useState(false); // state variable, who's state will change, and then the setter function which will change the state of the modal (setting it to true will keep the modal visible. its false by default )
   
    const handleClose = () => setShow(false); // handleClose method  means to show the modal when its clicked 
    const handleShow = () => setShow(true); // handle show method means to show the modal when something is done
    
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
        <Navbar className="low-width" expand="lg">
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
                        <button onClick={handleShow} className="vvd"><span>Sign Up</span></button>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    
          <Modal className="modal-margin modal-size" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="modal-color">Log in</Modal.Title>
            </Modal.Header>
            <div className="container-fluid">
            <Form className="form">
                    <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="form-label">Username</Form.Label>
                    <Form.Control type="form-text" placeholder="Username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="form-label ">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group>
                    <span className="d-flex justify-content-end">
                    <a className="forgot-password" href="#">Forgot password?</a>
                    </span>
                    </Form.Group>
                  
                    <Form.Group className="mb-3" controlId="formBasicCheckbox" />
                    <Form.Check className="checkbox-text mb-5" type="checkbox" label="Remember me" />
                <Button variant="primary" type="submit">
                    Login
                    </Button>
                
                  
                 </Form>
            </div>
               
            <Modal.Footer>
              <Button  className="modal-color" variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button className="modal-color" variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>

    );
}

export default NavBar;

// there is an issue where when the sign up button is hit and the modal comes the navbar shifts from left to right