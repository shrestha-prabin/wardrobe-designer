import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import DesignerPage from "./pages/DesignerPage";
import PreviewPage from "./pages/PreviewPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DesignerPage />} />
      <Route path="/view" element={<PreviewPage />} />
    </Routes>
  );
};

export default App;
