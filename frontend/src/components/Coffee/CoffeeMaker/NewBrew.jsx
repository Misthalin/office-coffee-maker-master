import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import Button from "../../Button/Button";
import Loading from "../../Loading/Loading";
import "./NewBrew.css";

const validationSchema = Yup.object().shape({
  brewName: Yup.string()
    .required('Name is required'),
  typeOfBean: Yup.string()
    .required('Type of bean is required'),
  gramsOfCoffee: Yup.number()
    .required('Scoops of coffee is required'),
  grindingSettings: Yup.number()
    .required('Grinding settings is required'),
  litersWater: Yup.number()
    .required('Liters of water is required')
})
const INITIAL_GRAMS = 11.6;

const INITIAL_VALUES = {
  brewName: "",
  typeOfBean: "",
  gramsOfCoffee: "",
  grindingSettings: "",
  litersWater: "",
};

const NewBrew = (props) => {
  
  const handleSubmit = async (fields, { setSubmitting }) => {
    const { brewName, typeOfBean, gramsOfCoffee, grindingSettings, litersWater } = fields;
    const data = { brewName, typeOfBean, gramsOfCoffee, grindingSettings, litersWater };
    try {
      await props.onSubmit(data);
    } catch (error) {
      setSubmitting(false)
    }
  };

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting, isValid, dirty, values }) => (
        <Form>
          <div className="form-container">
            <div className="form-input">
              <label className="text-regular" htmlFor="brewName">
                Brew Name
            </label>
              <Field type="text" name="brewName" id="brewName" className={'form-control' + (errors.brewName && touched.brewName ? ' is-invalid' : '')} />
              <ErrorMessage name="brewName" component="div" className="invalid-feedback" />
            </div>
            <div className="form-input">
              <label htmlFor="typeOfBean" className="text-regular">
                Select Bean
            </label>
              <Field as="select" name="typeOfBean" id="typeOfBean">
                <option value="" disabled hidden>...</option>
                {props.beans.map((bean) => (
                  <option key={bean._id} value={bean.typeOfBean}>
                    {bean.typeOfBean}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="typeOfBean" component="div" className="invalid-feedback" />
            </div>
            <div className="form-input">
              <label htmlFor="gramsOfCoffee" className="text-regular">
                Scoops of Coffeebean
            </label>
              <p className="text-small text-bold">One Scoop = {INITIAL_GRAMS} grams</p>

              <div className="radio-grid">
                <div className="radio-input">
                  <Field type="radio" name="gramsOfCoffee" id="oneGram" value={Math.floor(INITIAL_GRAMS).toString()} checked={values.gramsOfCoffee === Math.floor(INITIAL_GRAMS).toString()} />
                  <label htmlFor="oneGram">1</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="gramsOfCoffee" id="twoGram" value={Math.floor(INITIAL_GRAMS * 2).toString()} checked={values.gramsOfCoffee === Math.floor(INITIAL_GRAMS * 2).toString()} />
                  <label htmlFor="twoGram">2</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="gramsOfCoffee" id="three" value={Math.floor(INITIAL_GRAMS * 3).toString()} checked={values.gramsOfCoffee === Math.floor(INITIAL_GRAMS * 3).toString()} />
                  <label htmlFor="three">3</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="gramsOfCoffee" id="four" value={Math.floor(INITIAL_GRAMS * 4).toString()} checked={values.gramsOfCoffee === Math.floor(INITIAL_GRAMS * 4).toString()} />
                  <label htmlFor="four">4</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="gramsOfCoffee" id="five" value={Math.floor(INITIAL_GRAMS * 5).toString()} checked={values.gramsOfCoffee === Math.floor(INITIAL_GRAMS * 5).toString()} />
                  <label htmlFor="five">5</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="gramsOfCoffee" id="six" value={Math.floor(INITIAL_GRAMS * 6).toString()} checked={values.gramsOfCoffee === Math.floor(INITIAL_GRAMS * 6).toString()} />
                  <label htmlFor="six">6</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="gramsOfCoffee" id="seven" value={Math.floor(INITIAL_GRAMS * 7).toString()} checked={values.gramsOfCoffee === Math.floor(INITIAL_GRAMS * 7).toString()} />
                  <label htmlFor="seven">7</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="gramsOfCoffee" id="eight" value={Math.floor(INITIAL_GRAMS * 8).toString()} checked={values.gramsOfCoffee === Math.floor(INITIAL_GRAMS * 8).toString()} />
                  <label htmlFor="eight">8</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="gramsOfCoffee" id="nine" value={Math.floor(INITIAL_GRAMS * 9).toString()} checked={values.gramsOfCoffee === Math.floor(INITIAL_GRAMS * 9).toString()} />
                  <label htmlFor="nine">9</label> 
                </div>
              </div>
              <ErrorMessage name="gramsOfCoffee" component="div" className="invalid-feedback" />
            </div>
            
            <div className="form-input">
              <label htmlFor="grindingSettings" className="text-regular">
                Grinding Settings
            </label>
              <div className="radio-grid">
                <div className="radio-input">
                  <Field type="radio" name="grindingSettings" id="settingOne" value="1" checked={values.grindingSettings === "1"} />
                  <label htmlFor="settingOne">1</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="grindingSettings" id="settingTwo" value="2" checked={values.grindingSettings === "2"} />
                  <label htmlFor="settingTwo">2</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="grindingSettings" id="settingThree" value="3" checked={values.grindingSettings === "3"} />
                  <label htmlFor="settingThree">3</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="grindingSettings" id="settingFour" value="4" checked={values.grindingSettings === "4"} />
                  <label htmlFor="settingFour">4</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="grindingSettings" id="settingFive" value="5" checked={values.grindingSettings === "5"} />
                  <label htmlFor="settingFive">5</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="grindingSettings" id="settingSix" value="6" checked={values.grindingSettings === "6"} />
                  <label htmlFor="settingSix">6</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="grindingSettings" id="settingSeven" value="7" checked={values.grindingSettings === "7"} />
                  <label htmlFor="settingSeven">7</label>
                </div>
              </div>
              <ErrorMessage name="grindingSettings" component="div" className="invalid-feedback" />
            </div>
            <div className="form-input">
              <label htmlFor="litersWater" className="text-regular">
                Liters Water
            </label>
              <div className="radio-grid">
                <div className="radio-input">
                  <Field type="radio" name="litersWater" id="literOne" value="0.5" checked={values.litersWater === "0.5"} />
                  <label htmlFor="literOne">0.5</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="litersWater" id="literTwo" value="1.1" checked={values.litersWater === "1.1"} />
                  <label htmlFor="literTwo">1.1</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="litersWater" id="literThree" value="1.6" checked={values.litersWater === "1.6"} />
                  <label htmlFor="literThree">1.6</label>
                </div>
                <div className="radio-input">
                  <Field type="radio" name="litersWater" id="literFour" value="2.2" checked={values.litersWater === "2.2"} />
                  <label htmlFor="literFour">2.2</label>
                </div>
              </div>
              <ErrorMessage name="litersWater" component="div" className="invalid-feedback" />
            </div>
          </div>
          {isSubmitting ? <Loading /> : <>
          <Button title="Start Brewing" value="brewStart" variant="long" buttonType="submit" disabled={!(isValid && dirty)} />
          </>}
        </Form>
      )}
    </Formik>
  );
}

export default NewBrew;