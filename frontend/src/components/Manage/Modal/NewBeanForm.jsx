import React from "react";
import Button from "../../Button/Button";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Loading from '../../Loading/Loading';
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  typeOfBean: Yup.string()
    .required('Type of bean is required'),
  brand: Yup.string()
    .required('Brand is required'),
  roastProfile: Yup.string()
    .required('Roast profile is required'),
  roastType: Yup.string()
    .required('Roast type is required'),
  priceKg: Yup.number()
    .positive()
    .required('Price is required'),
  origin: Yup.string()
    .required('Origin is required')
})

const NewBeanForm = (props) => {
  const INITIAL_VALUES = {
    typeOfBean: "",
    brand: "",
    roastProfile: "",
    roastType: "",
    priceKg: "",
    origin: ""
  };

  const handleSubmit = async (fields, { setStatus, setSubmitting }) => {
    setStatus();
    try {
      await props._addBean(fields)
      props.closeModal();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting, isValid, dirty }) => (
        <Form>
          <div className="form-input">
            <label htmlFor="typeOfBean">Type of bean:</label>
            <Field
              type="text"
              name="typeOfBean"
              className={'form-control' + (errors.typeOfBean && touched.typeOfBean ? ' is-invalid' : '')}
            />
            <ErrorMessage name="typeOfBean" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input">
            <label htmlFor="brand">Brand:</label>
            <Field
              type="text"
              name="brand"
              className={'form-control' + (errors.brand && touched.brand ? ' is-invalid' : '')}
            />
            <ErrorMessage name="brand" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input">
            <label htmlFor="roastProfile">Roast profile:</label>
            <Field
              type="text"
              name="roastProfile"
              className={'form-control' + (errors.brand && touched.brand ? ' is-invalid' : '')}
            />
            <ErrorMessage name="roastProfile" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input">
            <label htmlFor="roastType">Roast type:</label>
            <Field
              type="text"
              name="roastType"
              className={'form-control' + (errors.roastType && touched.roastType ? ' is-invalid' : '')}
            />
            <ErrorMessage name="roastType" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input">
            <label htmlFor="priceKg">Price(per KG in NOK):</label>
            <Field
              type="number"
              name="priceKg"
              className={'form-control' + (errors.priceKg && touched.priceKg ? ' is-invalid' : '')}
            />
            <ErrorMessage name="priceKg" component="div" className="invalid-feedback" />
          </div>
          <div className="form-input">
            <label htmlFor="origin">Origin:</label>
            <Field
              type="text"
              name="origin"
              className={'form-control' + (errors.origin && touched.origin ? ' is-invalid' : '')}
            />
            <ErrorMessage name="origin" component="div" className="invalid-feedback" />
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

export default NewBeanForm;