//inspired by idg2100-ntnu-movies-front-end-1.0.0

import React, { useContext } from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import "./Login.css";

const Login = () => {
  const auth = useContext(AuthContext);

  const handleSubmit = async (email, password) => {
    const data = { email, password };
    await auth.loginUser(data);
  };
  return (
    <>
      <h1 className="text-center">Login</h1>
      <div className="login-container">
        <p>
          New to the site?{" "}
          <Link className="form-link text-bold" to="/register">
            Register
          </Link>
        </p>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default Login;
