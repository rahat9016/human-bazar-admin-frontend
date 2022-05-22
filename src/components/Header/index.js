import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../../action/auth.actions";
const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signOut());
  };
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li
          className="nav-item "
          style={{ cursor: "pointer" }}
          onClick={logout}
        >
          <span className="nav-link">Sign out</span>
        </li>
      </Nav>
    );
  };
  const renderNoneLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item ">
          <NavLink
            to="/signing"
            className="link-light text-decoration-none btn"
          >
            Signing
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink
            to="/signup"
            className="link-light text-decoration-none btn btn-danger "
          >
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: "9999" }}
    >
      <Container fluid>
        <Navbar.Brand href="/home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          Another action
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">
          Separated link
        </NavDropdown.Item>
      </NavDropdown> */}
          </Nav>
          {auth.authenticate
            ? renderLoggedInLinks()
            : renderNoneLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
