import { createContext } from "react";

const AppContext = createContext({
  buttonsVisible: true,
  colorsVisible: true,
  gridVisible: true,
  height: 0,
  width: 0,
  segmentCount: 2,
  setButtonsVisible: (visible) => {},
  setColorsVisible: (visible) => {},
  setGridVisible: (visible) => {},
  setHeight: (h) => {},
  setWidth: (w) => {},
  setSegmentCount: (c)=> {}
});

export default AppContext;
