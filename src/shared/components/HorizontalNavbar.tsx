// HorizontalNavbar.tsx
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, selectlogged } from '../../features/authentication/loginSlice';
import personIcon from '../assets/icons/user.png'

const HorizontalNavbar = () => {
  const logged = useAppSelector(selectlogged)
  const dispach = useAppDispatch();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" dir="rtl">
      <Container>
        <LinkContainer to="/lessons">
          <Navbar.Brand>צרפתית בכיף</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto"> {/* Changed from me-auto to ms-auto */}
            {/* Reversed the order of items to fit RTL layout */}
             <NavDropdown title ={<img src={personIcon} alt="חשבון" style={{ width: '24px', height: '24px' }} />} id="collapsible-nav-dropdown" className="order-3">
              {logged ? (
                <NavDropdown.Item onClick={() => dispach(logout())}>התנתקות</NavDropdown.Item>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <NavDropdown.Item>התחברות</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <NavDropdown.Item>הרשמה</NavDropdown.Item>
                  </LinkContainer>
                </>
              )}
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
