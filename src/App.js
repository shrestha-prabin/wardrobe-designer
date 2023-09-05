import React from "react";
import { Route, Routes } from "react-router-dom";
import DesignerPage from "./pages/DesignerPage";
import PreviewPage from "./pages/PreviewPage2";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DesignerPage />} />
      <Route path="/view" element={<PreviewPage />} />
    </Routes>
  );
};

export default App;
