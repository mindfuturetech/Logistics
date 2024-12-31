import React, { useState, useEffect } from 'react';
import './HomePage.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import AddTruckDetails from '../../Components/AddTruckDetails/AddTruckDetails';
import Reports from '../../Components/Reports/Reports';
import Freight from '../../Components/Freight/Freight';
import Vehicle from '../../Components/Vehicle/Vehicle';
import Vendor from '../../Components/Vendor/Vendor';
import Transactions from '../../Components/Transactions/Transactions';
import GenerateBill from '../../Components/GenerateBill/GenerateBill';

import Business from '../../Components/Business/Business';

axios.defaults.baseURL = 'http://localhost:5000/logistics';

const HomePage = () => {


  const location = useLocation();
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    // Switch the component based on the current pathname
    switch (location.pathname) {
      case '/home':
        setCurrentComponent(<AddTruckDetails />);
        break;
      case '/reports':
        setCurrentComponent(<Reports />);
        break;
      case '/freight':
        setCurrentComponent(<Freight />);
        break;
      case '/vehicle':
        setCurrentComponent(<Vehicle />);
        break;
      case '/vendor':
        setCurrentComponent(<Vendor />);
        break;
      case '/transactions':
        setCurrentComponent(<Transactions />);
        break;
      case '/generate-bill':
        setCurrentComponent(<GenerateBill />);
        break;
      case '/business':
        setCurrentComponent(<Business />);
        break;  
      default:
        setCurrentComponent(null); // Handle any other routes if necessary
        break;
    }
  }, [location.pathname]);


  return (
    <div className="Home">
      {console.log('location.pathname')}
      <Navbar />
      <Sidebar />
      {currentComponent}

    </div>
  )
}

export default HomePage
