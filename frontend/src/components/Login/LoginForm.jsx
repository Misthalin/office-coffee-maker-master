//inspired by idg2100-ntnu-movies-front-end-1.0.0
import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Loading from '../Loading/Loading';
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const LoginForm = (props) => {
  const INITIAL_VALUES = {
    email: "",
    password: "",
  };

  const handleLogin = async (fields, { setStatus, setSubmitting }) => {
    setStatus();
    const { email, password } = fields
    try {
      props.onSubmit(email, password);
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={handleLogin}>
      {({ errors, touched, isSubmitting, isValid, dirty }) => (
        <Form className="login-form">
          <div className="form-input">
            <label className="text-bold" htmlFor="email">
              Email
          </label>
            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input">
            <label className="text-bold" htmlFor="password">
              Password
          </label>
            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
          <p>
            <Link className="form-link text-bold" to="/account/forgot-password">
              Forgot password?
          </Link>
          </p>
          {isSubmitting ? <Loading /> : <>
          <Button title="Login" buttonType="submit" value="Login" variant="long" disabled={!(isValid && dirty)} />
          </>}
        </Form>
      )}
    </Formik>
  );
}


export default LoginForm;