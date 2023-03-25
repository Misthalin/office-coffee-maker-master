//inspired by idg2100-ntnu-movies-front-end-1.0.0
import React from "react";
import Button from "../../Button/Button";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Loading from '../../Loading/Loading';
import * as Yup from "yup";
import "../RegisterForm.css";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
})

const ForgotPasswordForm = (props) => {
  const INITIAL_VALUES = {
    email: "",
  };

  const handleReset = async (fields, { setStatus, setSubmitting }) => {
    setStatus();
    const { email } = fields;
    try {
      props.onSubmit(email);
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={handleReset}>
      {({ errors, touched, isSubmitting, isValid, dirty }) => (
        <Form className='register-form'>
          <div className="form-input">
            <label className='text-bold' htmlFor="email">Email</label>
            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>
          {isSubmitting ? <Loading /> : <>
          <Button title="Send reset instructions" value="Reset" variant="long" buttonType="submit" disabled={!(isValid && dirty)} />
          </>}
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPasswordForm;
