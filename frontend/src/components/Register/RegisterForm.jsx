// Inspired by https://github.com/cornflourblue/react-signup-verification-boilerplate / https://jasonwatmore.com/post/2020/04/22/react-email-sign-up-with-verification-authentication-forgot-password
import React, { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import "./RegisterForm.css";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

const RegisterForm = () => {
  const INITIAL_VALUES = { username: "", email: "", password: "", confirmPassword: "", acceptTerms: true };

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/login";

  const auth = useContext(AuthContext);

  const handleRegister = async (fields, { setStatus, setSubmitting }) => {
    setStatus();
    try {
      await auth.registerUser(fields);
      navigate(from, { replace: true })
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={handleRegister}>
      {({ errors, touched, isSubmitting, isValid, dirty  }) => (
        <Form className="register-form">
          <div className="form-input">
            <label className="text-bold" htmlFor="username">Username</label>
            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
            <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input">
            <label className="text-bold" htmlFor="email">Email</label>
            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input">
            <label className="text-bold" htmlFor="password">Password</label>
            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input"><label className="text-bold" htmlFor="password">Confirm Password</label>
            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
          </div>
          {isSubmitting ? <Loading /> : <Button title="Register" value="Register" variant="long" buttonType="submit" disabled={!(isValid && dirty)} />}
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;