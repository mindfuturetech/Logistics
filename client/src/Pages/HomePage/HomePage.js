import React, {useState} from 'react';
import './HomePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useAuth } from '../../Auth/AuthContext';
import Navbar from '../../Components/Navbar/Navbar';
import Logout from '../../Components/Logout/Logout';
import Sidebar from '../../Components/Sidebar/Sidebar';
import AddTruckDetails from '../../Components/AddTruckDetails/AddTruckDetails';


axios.defaults.baseURL = 'http://localhost:5000/logistics';

const HomePage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
      };
      
  return (
    <div className='Home'>
    <Navbar toggleSidebar={toggleSidebar} isCollapsed={isSidebarCollapsed} />
    <Sidebar isCollapsed={isSidebarCollapsed} />
    <div className={`add-truck-details-wrapper ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <AddTruckDetails isSidebarCollapsed={isSidebarCollapsed} />
    </div>
</div>
  )
}

export default HomePage
