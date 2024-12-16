import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Freight from "./Components/Freight/Freight";
import Vehicle from "./Components/Vehicle/Vehicle";
import Vendor from "./Components/Vendor/Vendor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/freight" element={<Freight />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/vendor" element={<Vendor />} />
      </Routes>
    </Router>
  );
}

export default App;
