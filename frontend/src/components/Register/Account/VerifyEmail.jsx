// Inspired by https://github.com/cornflourblue/react-signup-verification-boilerplate / https://jasonwatmore.com/post/2020/04/22/react-email-sign-up-with-verification-authentication-forgot-password
import React, { useState, useContext, useEffect } from 'react'
import { Link, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthContext";

import Loading from '../../Loading/Loading';
import "../Register.css";

const VerifyEmail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const EmailStatus = { Verifying: 'Verifying', Failed: 'Failed' }
    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);
    const auth = useContext(AuthContext);

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/login";

    useEffect(() => {
        const token = searchParams.get('token');
        const requestVerification = async () => {
            setSearchParams('')
            try {
                await auth.verifyEmail(token)
                navigate(from, { replace: true });
            } catch (error) {
                setEmailStatus(EmailStatus.Failed)
                return error
            }
        }
        token ? requestVerification() : setEmailStatus(EmailStatus.Failed);
    }, [searchParams, emailStatus, setSearchParams, auth, EmailStatus.Failed, from, navigate]);

    const template = () => {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return <><p className="text-center">Verifying...</p><Loading /></>
            case EmailStatus.Failed:
                return <p>Verification failed, you can also verify your account using the <Link to="/account/forgot-password">forgot password</Link> page.</p>
            default:
        }
    }

    return (
        <div>
            <h1 className="text-center">Verify Email</h1>
            <div className="register-container">{template()}</div>
        </div>
    )
}

export default VerifyEmail
