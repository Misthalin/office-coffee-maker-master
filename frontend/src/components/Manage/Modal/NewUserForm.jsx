import React from "react";
import Button from "../../Button/Button";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Loading from '../../Loading/Loading';
import * as Yup from "yup";

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
  role: Yup.mixed().oneOf(['User', 'Admin'])
    .required('Role is required')
})

const NewUserForm = (props) => {
  const INITIAL_VALUES = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  };

  const handleSubmit = async (fields, { setStatus, setSubmitting }) => {
    setStatus();
    const { username, email, password, confirmPassword, role } = fields;
    try {
      await props._addUser(username, email, password, confirmPassword, role);
      props.closeModal();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting, isValid, dirty }) => (
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
            <label htmlFor="role">Role:</label>
            <Field as="select" name="role" id="role">
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Field>
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
          <div className="btn-group">
            {isSubmitting ? <Loading /> : <>
              <Button title="Submit" buttonType="submit" disabled={!(isValid && dirty)} />
              <Button title="Close" buttonType="button" onClickEvent={props.closeModal} />
            </>}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NewUserForm;