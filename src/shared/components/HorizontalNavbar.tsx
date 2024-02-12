// HorizontalNavbar.tsx
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, selectlogged, selectUsername } from '../../features/authentication/loginSlice';

// Import styles and assets
import personIcon from '../assets/icons/user.png'
import styles from './HorizontalNavbar.module.css'; 

// Functional component for the horizontal navigation bar
const HorizontalNavbar = () => {
    // Use Redux hooks to access authentication state
  const logged = useAppSelector(selectlogged) // Boolean indicating if user is logged in
  const username = useAppSelector(selectUsername); // Username of the logged-in user
  const dispach = useAppDispatch();// Function to dispatch actions

    // Helper function to extract user initials from username
  const getUserInitials = (username: string) => {
    return username ? username.substring(0, 2).toUpperCase() : '';
  };

  // Render the navigation bar
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" dir="rtl">
      <Container>
        <LinkContainer to="/lessons">
          <Navbar.Brand>צרפתית בכיף</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-start"> {/* Changed from me-auto to ms-auto */}
            {/* Conditional rendering for user icon or initials based on login state */}
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
               {/* Conditional rendering for logout or login/signup options */}
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
            {/* Links to site sections with order adjusted for RTL layout */}
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
