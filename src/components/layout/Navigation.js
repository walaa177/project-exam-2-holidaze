import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar
      className="home-nav container-flauid"
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      hidden={window.location.pathname === "/admin"}
    >
      {/* Brand/Logo */}
      <Navbar.Brand as={Link} to="/" className="home-nav-logo">
        <a>
          <img src="/images/logo1.png" alt="logo leter h from holidaze"></img>
          <span>Holidaze</span>
        </a>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* menu*/}

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            as={Link}
            to="/"
            activeClassName="active"
            className="nav-link-fade-up"
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/establishments"
            activeClassName="active"
            className="nav-link-fade-up"
          >
            Establishments
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/contact"
            activeClassName="active"
            className="nav-link-fade-up"
          >
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
