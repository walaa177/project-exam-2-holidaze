import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

function NavigationAdmin() {
  const [auth, setAuth] = useContext(AuthContext);

  function logout() {
    setAuth(null);
    localStorage.clear();
    window.location = "/admin";
  }

  return (
    <Navbar
      className="home-nav"
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      hidden={window.location.pathname === "/admin"}
    >
      <Navbar.Brand className="ml-3">
        {auth ? "Hi " + auth.user.username : ""}
      </Navbar.Brand>

      <Navbar className="justify-content-end">
        <Nav.Link
          as={Link}
          to="/admin"
          activeClassName="active"
          className="nav-link-admin"
          onClick={logout}
        >
          {auth ? "log out" : ""}
        </Nav.Link>
      </Navbar>
    </Navbar>
  );
}

export default NavigationAdmin;
