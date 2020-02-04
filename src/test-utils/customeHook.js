import React from "react";

import { render } from "@testing-library/react";

const renderHook = (hook, formInputIntialValue) => {
  const TestComponent = ({ children }) => children(hook(formInputIntialValue));
  const returnValue = {};

  render(
    <TestComponent>
      {value => {
        Object.assign(returnValue, value);
        return null;
      }}
    </TestComponent>
  );
  return returnValue;
};

export default renderHook;
