
import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4" style={{ color: "#6610f2" }}>About iNotebook</h1>
      
      <p className="lead">
        This is about <strong>iNotebook</strong>:
      </p>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">📝 Write your personal / professional notes</li>
        <li className="list-group-item">🔒 Secure your notes on cloud</li>
        <li className="list-group-item">🌐 Access your notes from anywhere / from any device</li>
        <li className="list-group-item">✏️ Edit or Delete your notes</li>
        <li className="list-group-item">🏷️ Give your notes a relevant tag</li>
        <li className="list-group-item">🛡️ Maintain privacy using credentials</li>
      </ul>

      <p className="mt-4">
        iNotebook makes it simple and secure to manage your personal and professional notes in one place, accessible anytime, anywhere.
      </p>
    </div>
  );
};

export default About;


