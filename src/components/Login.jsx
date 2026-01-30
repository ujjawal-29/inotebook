
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// const Login = (props) => {

//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: credentials.email,
//         password: credentials.password
//       })
//     });

//     const json = await response.json();
//     console.log("Backend Response:", json);

//     // ✅ Correct condition
//     if (json.authtoken) {
//       localStorage.setItem("token", json.authtoken);
      
//          // home page par bhej do
//        props.showAlert("Logged Successfully","Success")
//        navigate("/");
//     } else {
//         props.showAlert("invalid Details","danger")
//     }
//   };

//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="container mt-3">
//       <h2>Login to Continue to iNotebook</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email address</label>
//           <input 
//             type="email" 
//             className="form-control"
//             id="email"
//             name="email"
//             value={credentials.email}
//             onChange={onChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input 
//             type="password" 
//             className="form-control"
//             id="password"
//             name="password"   // 🔴 ye bahut important fix hai
//             value={credentials.password}
//             onChange={onChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const host = "https://inotebook-backend-8c05.onrender.com"; // backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      const json = await response.json();
      if (json.authtoken) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Logged in Successfully", "success");
        navigate("/");
      } else {
        props.showAlert(json.error || "Invalid Details", "danger");
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
