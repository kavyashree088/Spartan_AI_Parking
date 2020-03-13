import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class NavigationBarLogin extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Spartans AI Parking</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="ml-auto">
          <Nav.Link href="/">Logout</Nav.Link>
          <Nav.Link href="/AboutUS">About US</Nav.Link>
          <Nav.Link href="/Help">Help</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
