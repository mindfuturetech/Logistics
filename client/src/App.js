// client/src/App.js
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import {useAuth} from './Auth/AuthContext';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import HomePage from './Pages/HomePage/HomePage';
import Loading from './Components/Loading/Loading';



function App() {

  // const {isAuthenticated, setIsAuthenticated, isLoading, setIsLoading} = useAuth(); 
  
  const {isLoading} = useAuth();
  const isAuthenticated = Cookies.get('isAuthenticated') === 'true';
  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path='/signup' 
            element={isAuthenticated ? <Navigate to="/home" /> : <SignUp />} 
          />
          <Route 
            path='/' 
            element={isAuthenticated ? <Navigate to="/home" /> : <Login />} 
          />
          <Route 
            path='/home' 
            element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} 
          />
          <Route 
            path='/reports' 
            element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} 
          />
          <Route 
            path='/business' 
            element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} 
          />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
