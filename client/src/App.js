import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Freight from "./Components/Freight/Freight"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/freight" element={<Freight />} />
        {/* <Route path="/login-form" element={<Login />} /> */}
        {/* <Route path="/home" element={<Freight />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
