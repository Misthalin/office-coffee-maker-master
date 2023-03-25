//inspired by idg2100-ntnu-movies-front-end-1.0.0
import React, { useContext, useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthContext";
import "../Register.css";

const ForgotPassword = () => {
    const [error, setError] = useState();

    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/login";

    const auth = useContext(AuthContext);

    const handleSubmit = async (email) => {
        try {
            const res = await auth.forgotPassword(email);
            const response = res.response.data;
            if (response.error) {
                setError(response.error);
            }
            navigate(from, { replace: true });
        } catch (error) {
            return <p>{error}</p>;
        }
    };
    return (
        <>
            <h1 className="text-center">Forgot Password</h1>

            <div className="register-container">
                <p>
                    Remember your password?{" "}
                    <Link className="form-link text-bold" to="/login">Go back to login</Link>
                </p>
                <ForgotPasswordForm onSubmit={handleSubmit} />
                {error && <p>{error}</p>}
            </div>
        </>
    );
};

export default ForgotPassword;
