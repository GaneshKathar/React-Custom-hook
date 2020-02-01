import renderHook from "../../test-utils/customeHook";

import useForm from "../useForm";

describe("Use form hook", () => {
  let renderedHook;
  beforeEach(() => {
    renderedHook = renderHook(useForm);
  });

  it("should set input value for given key", () => {
    renderedHook.setValue("name-input", "test name");

    expect(renderedHook.values).toEqual({ "name-input": "test name" });
  });

  it("should set error value for given key", () => {
    renderedHook.setError("email-input", "email is already exit");

    expect(renderedHook.errors).toEqual({
      "email-input": "email is already exit"
    });
  });

  it("should validate the value of given input field key", () => {
    renderedHook.setValue("address-input", "F-123, test road, test city.");
    const addressValidator = (value = "") =>
      value.length > 5 ? "" : "too small";

    expect(renderedHook.isValid("address-input", addressValidator)).toEqual("");
  });

  it("should set error for given input key if input value is invalid", () => {
    renderedHook.setValue("address-input", "F-123");
    const addressValidator = (value = "") =>
      value.length > 5 ? "" : "too small";

    expect(renderedHook.isValid("address-input", addressValidator)).toEqual(
      "too small"
    );
    expect(renderedHook.errors).toEqual({ "address-input": "too small" });
  });

  it("should validate complete form and set error for invalid input value", () => {
    renderedHook.setValue("address-input", "F-123");
    renderedHook.setValue("name-input", "test name");

    const addressValidator = (value = "") =>
      value.length > 5 ? "" : "too small";
    const nameValidator = (value = "") =>
      value.length < 10 ? "" : "too small";

    const validators = {
      "address-input": addressValidator,
      "name-input": nameValidator
    };

    expect(renderedHook.isFormValid(validators)).toEqual(false);
    expect(renderedHook.errors).toEqual({
      "address-input": "too small",
      "name-input": ""
    });
  });

  it("should change the value for the onChnage event of input field", () => {
    const event = {
      target: {
        id: "name",
        value: "test name"
      }
    };

    renderedHook.onChange(event);

    expect(renderedHook.values).toEqual({ name: "test name" });
  });
});
