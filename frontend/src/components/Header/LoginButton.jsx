import React, { useContext } from "react";
import {AuthContext} from "../../utils/AuthContext";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./LoginButton.css";

const LoginButton = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="login-btn" tabIndex="-1">
      {user && (
        <Link style={{ marginLeft: ".5em" }} to="/logout" tabIndex={-1}>
          <Button title="Logout" />
        </Link>
      )}
      {!user && (
        <Link style={{ marginLeft: ".5em" }} to="/login" tabIndex={-1}>
          <Button title="Login" />
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
