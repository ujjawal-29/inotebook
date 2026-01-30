import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const host = process.env.REACT_APP_BACKEND_URL || "https://inotebook-backend-8c05.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in with:", credentials);

      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();
      console.log("Login response:", json);

      if (response.ok && json.authtoken) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Logged in Successfully", "success");
        navigate("/");
      } else {
        props.showAlert(json.error || json.message || "Invalid Details", "danger");
      }

    } catch (error) {
      console.error("Login error:", error);
      props.showAlert("Server not reachable", "danger");
    }
  };

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="container mt-3">
      <h2>Login to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
