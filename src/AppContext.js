import React, { createContext } from "react";

const AppContext = createContext({
  buttonsVisible: true,
  colorsVisible: true,
  height: 0,
  width: 0,
  segmentCount: 2,
  setButtonsVisible: (visible) => {},
  setColorsVisible: (visible) => {},
  setHeight: (h) => {},
  setWidth: (w) => {},
  setSegmentCount: (c)=> {}
});

export default AppContext;
