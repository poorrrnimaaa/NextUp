import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      console.log(email, password, role);

      // FIXED API URL
      const res = await api.post("/auth/login", {
        email,
        password,
        role
      });

      const user = res.data.user;

      alert("Login successful");

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }

  };

  return (

    <div className="container d-flex justify-content-center align-items-center my-5">

      <div className="card login-card p-4 shadow">

        <h4 className="mb-3 text-center fw-bold">Sign In</h4>

        <form onSubmit={handleLogin}>

          <input
            className="form-control mb-3"
            placeholder="Email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="form-select mb-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn btn-primary w-100 login-btn">
            Login
          </button>

        </form>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>

      </div>

    </div>

  );

}

export default Login;