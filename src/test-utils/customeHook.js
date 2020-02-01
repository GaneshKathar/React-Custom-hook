import React from "react";

import { render } from "@testing-library/react";

const renderHook = (hook, intitalValue) => {
  const HookComponent = ({ children, intitalValue }) =>
    children(hook(intitalValue));
  const returnValue = {};

  render(
    <HookComponent>
      {val => {
        Object.assign(returnValue, val);
        return null;
      }}
    </HookComponent>
  );
  return returnValue;
};

export default renderHook;
