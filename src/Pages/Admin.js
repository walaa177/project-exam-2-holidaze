import React from "react";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import LoginForm from "../components/form/LoginForm";

function Admin() {
  const [auth, setAuth] = useContext(AuthContext);

  if (localStorage.getItem("auth")) {
    window.location = "/admin/dashboard";
    return;
  }
  return (
    <div className="admin-login">
      <Helmet>
        <title>Holidaze|| Admin log in</title>
        <meta name="description" content="Login for Holidaze administrators" />
      </Helmet>
      <LoginForm />
    </div>
  );
}

export default Admin;
