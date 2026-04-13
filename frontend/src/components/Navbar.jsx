import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logo}
          alt="Project Logo"
          style={{ height: "36px", marginRight: "10px" }}
        />
        <span className="fw-bold fs-4">NextUp</span>
      </Link>

      <div className="ms-auto">
        <Link className="btn nav-btn" to="/">
          Home
        </Link>
        <Link className="btn hero-btn nav-btn" to="/login">
          Login
        </Link>
        <Link to="/signup" className="btn btn-outline-success ms-2">
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
