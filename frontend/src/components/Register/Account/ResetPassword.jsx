// Inspired by https://github.com/cornflourblue/react-signup-verification-boilerplate / https://jasonwatmore.com/post/2020/04/22/react-email-sign-up-with-verification-authentication-forgot-password
import React, { useContext, useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { AuthContext } from "../../../utils/AuthContext";
import Button from "../../Button/Button";
import Loading from "../../Loading/Loading";
import "../Register.css";

const ResetPassword = () => {
    const TokenStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }

    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);
    const [searchParams, setSearchParams] = useSearchParams();

    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/login";
    const auth = useContext(AuthContext);

    useEffect(() => {
        const token = searchParams.get('token');
        const requestValidation = async () => {
            setSearchParams('')
            try {
                await auth.validateResetToken(token);
                toast.dismiss();
                setToken(token);
                setTokenStatus(TokenStatus.Valid);
            } catch (error) {
                setTokenStatus(TokenStatus.Invalid);
                return error
            }
        }
        token && requestValidation()
    }, [searchParams, TokenStatus.Invalid, TokenStatus.Valid, setSearchParams, auth]);

    const getForm = () => {
        const initialValues = {
            password: '',
            confirmPassword: ''
        };

        const validationSchema = Yup.object().shape({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        });

        const onSubmit = async ({ password, confirmPassword }, { setSubmitting }) => {
            try {
                await auth.resetPassword( token, password, confirmPassword )
                navigate(from, { replace: true });
            } catch (error) {
                setSubmitting(false);
            }
        }

        return (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting, isValid, dirty }) => (
                    <Form className="register-form">
                        <div className="form-input">
                            <label className="text-bold" htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-input"><label className="text-bold" htmlFor="password">Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                        {isSubmitting ? <Loading /> : 
                        <Button title="Reset Password" value="ResetPassword" variant="long" buttonType="submit" disabled={!(isValid && dirty)} />
                        }
                    </Form>
                )}
            </Formik>
        );
    }

    function getBody() {
        switch (tokenStatus) {
            case TokenStatus.Valid:
                return getForm();
            case TokenStatus.Invalid:
                return <p>Token validation failed, if the token has expired you can get a new one at the <Link to="/account/forgot-password">forgot password</Link> page.</p>;
            case TokenStatus.Validating:
                return <p>Validating token...</p>;
            default:
        }
    }

    return (
        <div>
            <h1 className="text-center">Reset Password</h1>
            <div className="register-container">{getBody()}</div>
        </div>
    )
}

export default ResetPassword; 