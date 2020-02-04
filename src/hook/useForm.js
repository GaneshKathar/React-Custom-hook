import { useState } from "react";

const createValueObject = (key, value) => {
  return { [key]: value };
};

const useForm = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const setValue = (key, value) => {
    setValues(prevState =>
      Object.assign({}, prevState, createValueObject(key, value, false))
    );
  };

  const setError = (key, error) => {
    setErrors(prevState =>
      Object.assign({}, prevState, createValueObject(key, error))
    );
  };

  const validate = (key, validator) => {
    const message = validator(values[key]);
    setError(key, message);
    return message;
  };

  const formValidate = validators => {
    const validations = Object.keys(validators).map(validatorKey =>
      validate(validatorKey, validators[validatorKey])
    );
    return validations.every(validationMessage => validationMessage === "");
  };

  const onChange = event => {
    setValue(event.target.id, event.target.value);
  };

  return {
    values,
    setValue,
    errors,
    validate,
    formValidate,
    onChange,
    setError
  };
};

export default useForm;
