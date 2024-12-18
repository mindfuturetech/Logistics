import React, {useState,useEffect} from 'react';
import './HomePage.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useAuth } from '../../Auth/AuthContext';
import Navbar from '../../Components/Navbar/Navbar';
import Logout from '../../Components/Logout/Logout';
import Sidebar from '../../Components/Sidebar/Sidebar';
import AddTruckDetails from '../../Components/AddTruckDetails/AddTruckDetails';
import Reports from '../../Components/Reports/Reports';

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
