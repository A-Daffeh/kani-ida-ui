import { useState } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import './NavBar.css';
import { assets } from '../../assets/assets';

const NavBar = () => {
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
                        <Nav.Link href="#" className={activeLink === '#' ? 'active navbar-link' : 'navbar-link' } onClick={() => onUpdateActiveLink('#')}>Contact</Nav.Link>
                    </Nav>
                    <span className="navbar-text">
                        <div className="social-icon">
                            <a href="#"><img src={assets.search_icon} alt="Search" /></a>
                            <a href="#"><img src={assets.basket_icon} alt="Add to Cart" /></a>
                        </div>
                        <button className="vvd"><span>Sign In</span></button>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;