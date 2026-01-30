
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const navigate = useNavigate();
  const host = process.env.REACT_APP_BACKEND_URL || "https://inotebook-backend-8c05.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!credentials.name || !credentials.email || !credentials.password || !credentials.cpassword) {
      props.showAlert("All fields are required", "danger");
      return;
    }

    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Password and Confirm Password do not match", "danger");
      return;
    }

    try {
      console.log("Sending signup request:", credentials);

      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();
      console.log("Signup response:", json);

      if (response.status === 201 || json.authtoken) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Account Created Successfully", "success");
        navigate("/");
      } else {
        props.showAlert(json.error || json.message || "Invalid Details", "danger");
      }

    } catch (error) {
      console.error("Signup error:", error);
      props.showAlert("Server not reachable", "danger");
    }
  };

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="container mt-3">
      <h2>Create an account to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
