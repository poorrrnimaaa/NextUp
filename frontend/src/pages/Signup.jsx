import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Signup() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/signup", { name, phone, email, password });
      alert("Signup successful!");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
      <div className="card login-card p-4 shadow">

        <h4 className="mb-3 text-center fw-bold">Sign Up</h4>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            className="form-control mb-3"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="form-control mb-3"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control mb-3"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="btn btn-success w-100">
            Signup
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;