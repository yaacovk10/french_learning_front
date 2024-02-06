// HorizontalNavbar.js
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const HorizontalNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#lessons">Lessons</Nav.Link>
            <Nav.Link href="#exercise">Exercise</Nav.Link>
            <NavDropdown title="Account" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#login">Login</NavDropdown.Item>
              <NavDropdown.Item href="#signup">Sign Up</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HorizontalNavbar;
