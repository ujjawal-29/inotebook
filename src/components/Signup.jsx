// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = (props) => {
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//     cpassword: ""
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 🔴 Password match check
//     if (credentials.password !== credentials.cpassword) {
//       props.showAlert("Password and Confirm Password do not match", "danger");
//       return;
//     }

//     const response = await fetch("http://localhost:5000/api/auth/createuser", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: credentials.name,
//         email: credentials.email,
//         password: credentials.password
//       })
//     });

//     const json = await response.json();
//     console.log("Backend Response:", json);

//     if (json.authtoken) {
//       localStorage.setItem("token", json.authtoken);
//       props.showAlert("Account Created Successfully", "success");
//       navigate("/");   // Home page
//     } else {
//       props.showAlert("Invalid Details", "danger");
//     }
//   };

//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="container mt-2">
//       <h2 className="my-3">Create an account to continue to iNotebook</h2>

//       <form onSubmit={handleSubmit}>

//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input type="text" className="form-control" name="name" onChange={onChange} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input type="email" className="form-control" name="email" onChange={onChange} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input type="password" className="form-control" name="password" onChange={onChange} minLength={5} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Confirm Password</label>
//           <input type="password" className="form-control" name="cpassword" onChange={onChange} minLength={5} required />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Signup
//         </button>

//       </form>
//     </div>
//   );
// };

// export default Signup;




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
  const host = "https://inotebook-backend-8c05.onrender.com"; // backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Password and Confirm Password do not match", "danger");
      return;
    }
    try {
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
      if (json.authtoken) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Account Created Successfully", "success");
        navigate("/");
      } else {
        props.showAlert(json.error || "Invalid Details", "danger");
      }
    } catch (error) {
      console.error("Signup error:", error);
      props.showAlert("Server not reachable", "danger");
    }
  };

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="container mt-2">
      <h2>Create an account to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
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
