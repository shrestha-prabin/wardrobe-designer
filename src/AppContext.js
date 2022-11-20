import React, { createContext } from "react";

const AppContext = createContext({
  buttonsVisible: true,
  colorsVisible: true,
  setButtonsVisible: (visible) => {},
  setColorsVisible: (visible) => {},
});

export default AppContext;
