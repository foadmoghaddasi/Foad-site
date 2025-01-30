import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import HeasboApp from "./pages/HesaboApp";
import HeasboPanel from "./pages/HesaboPanel";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
          <Route path="/app" element={<HeasboApp />} />
          <Route path="/panel" element={<HeasboPanel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
