import React, { useState } from "react";
import useForm from "../src/hook/useForm";

import "./styles.css";

const renderInput = (id, name, type, error, onChange) => {
  return (
    <div className="input">
      <label htmlFor={id}>{name}: </label>
      <input id={id} type={type} name={name} onChange={onChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

const renderObject = object => {
  return Object.keys(object).map(key => (
    <div>
      <sapn>{key}</sapn>:&nbsp;&nbsp;<span>{object[key]}</span>
    </div>
  ));
};

const required = (value = "") => (value.length === 0 ? "required field" : "");
const addressValidator = (value = "") => (value.length <= 5 ? "too small" : "");
const mobileNumberValidator = (value = "") =>
  value.length !== 10 || !/^\d+$/.test(value) ? "invalid mobile number" : "";

const validators = {
  name: required,
  address: addressValidator,
  mobile: mobileNumberValidator
};

export default function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { values, errors, formValidate, onChange } = useForm();

  const onSubmit = e => {
    e.preventDefault();
    if (formValidate(validators)) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="App">
      <h1>Hello Developer</h1>
      <h2>Let's see how useForm work</h2>
      <form onSubmit={onSubmit}>
        {renderInput("name", "name", "text", errors["name"], onChange)}
        {renderInput("address", "address", "text", errors["address"], onChange)}
        {renderInput("mobile", "Mobile no", "text", errors["mobile"], onChange)}
        <button type="submit">submit</button>
      </form>
      {formSubmitted && <div>Form submit successfully</div>}
      <div>
        <h2>Form data</h2>
        <h4>values</h4>
        {renderObject(values)}
        <h4>errors</h4>
        {renderObject(errors)}
      </div>
    </div>
  );
}
