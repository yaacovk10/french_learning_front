// HorizontalNavbar.tsx
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HorizontalNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" dir="rtl">
      <Container>
        <LinkContainer to="/lessons">
          <Navbar.Brand>האפליקציה שלי</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto"> {/* Changed from me-auto to ms-auto */}
            {/* Reversed the order of items to fit RTL layout */}
            <NavDropdown title="חשבון" id="collapsible-nav-dropdown" className="order-3">
              <LinkContainer to="/login">
                <NavDropdown.Item>התחברות</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/signup">
                <NavDropdown.Item>הרשמה</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/exercise" className="order-2">
              <Nav.Link>תרגול</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/lessons" className="order-1">
              <Nav.Link>שיעורים</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HorizontalNavbar;
