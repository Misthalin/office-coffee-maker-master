import React from "react";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";

import "./Register.css";

const Register = () => {
  return (
    <>
      <h1 className="text-center">Register</h1>
      <div className="register-container">
        <p>
          Already a member?{" "}
          <Link className="form-link text-bold" to="/login">
            Login
          </Link>
        </p>
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
