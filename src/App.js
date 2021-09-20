import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./sass/style.scss";
import Navigation from "./components/layout/Navigation";
import Home from "./Pages/Home";
import Establishments from "./Pages/Establishments";
import Contact from "./Pages/Contact";
import ItemDetails from "./components/establishmentsPage/ItemDetails";
import Footer from "./components/layout/Footer";
import Admin from "./Pages/Admin";
import Dashboard from "./components/admin/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import NavigationAdmin from "./components/layout/NavigationAdmin";
import NoPage from "./Pages/NoPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="main">
          {window.location.pathname !== "/admin/dashboard" ? (
            <Navigation />
          ) : (
            <NavigationAdmin />
          )}

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/establishments">
              <Establishments />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/detail/:id">
              <ItemDetails />
            </Route>
            <Route path="/admin" exact>
              <Admin />
            </Route>
            <Route path="/admin/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="*">
              <NoPage />
            </Route>
          </Switch>
          {window.location.pathname !== "/admin" ? <Footer /> : ""}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
