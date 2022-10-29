import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
function Header() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Link to="/">
          <Navbar.Brand className="align-items-center d-flex">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
            />
            Hacker News
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}
export default Header;
