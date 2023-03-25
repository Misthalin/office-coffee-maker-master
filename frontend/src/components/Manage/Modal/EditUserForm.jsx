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
  role: Yup.mixed().oneOf(['User', 'Admin'])
    .required('Role is required')
})

const EditUserForm = (props) => {
  const INITIAL_VALUES = {
    id: props.id,
    username: props.username,
    email: props.email,
    role: props.role,
  };

  const handleSubmit = async (fields, { setStatus, setSubmitting }) => {
    setStatus();
    try {
      await props._editUser(props.id, fields)
      props.closeModal();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting, isValid }) => (
        <Form>
          <div className="form-input">
            <label htmlFor="username">Username: {props.username}</label>
            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
            <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input">
            <label htmlFor="email">Email: {props.email}</label>
            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input">
            <label htmlFor="role">Role: {props.role}</label>
            <Field as="select" name="role" id="role">
              <option>{props.role}</option>
              <option>{props.role === "User" ? "Admin" : "User"}</option>
            </Field>
          </div>
          <div className="btn-group">
            {isSubmitting ? <Loading /> : <>
              <Button title="Submit" buttonType="submit" disabled={!isValid} />
              <Button title="Close" buttonType="button" onClickEvent={props.closeModal} />
            </>}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditUserForm;