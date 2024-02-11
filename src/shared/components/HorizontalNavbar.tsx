// HorizontalNavbar.tsx
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, selectlogged, selectUsername } from '../../features/authentication/loginSlice';
import personIcon from '../assets/icons/user.png'
import styles from './HorizontalNavbar.module.css'; // Adjust the path as necessary


const HorizontalNavbar = () => {
  const logged = useAppSelector(selectlogged)
  const username = useAppSelector(selectUsername); // Get the username
  console.log("username", username)
  const dispach = useAppDispatch();

  // Function to get the first two letters of the username
  const getUserInitials = (username: string) => {
    return username ? username.substring(0, 2).toUpperCase() : '';
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" dir="rtl">
      <Container>
        <LinkContainer to="/lessons">
          <Navbar.Brand>צרפתית בכיף</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-start"> {/* Changed from me-auto to ms-auto */}
            {/* Reversed the order of items to fit RTL layout */}
            <NavDropdown
              title={
                logged ? (
                  <div className={styles.userInitials}>
                    {getUserInitials(username)}
                  </div>
                ) : (
                  <img src={personIcon} alt="חשבון" style={{ width: '24px', height: '24px' }} />
                )
              }
              id="collapsible-nav-dropdown"
              className={`order-4 ${styles.navDropdown}`}
            >
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
            <LinkContainer to="/about" className={`order-3 ${styles.navLinkContainer}`}>
              <Nav.Link>אודות האתר</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/exercise" className={`order-2 ${styles.navLinkContainer}`}>
              <Nav.Link>תרגול</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/lessons" className={`order-1 ${styles.navLinkContainer}`}>
              <Nav.Link>שיעורים</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HorizontalNavbar;
