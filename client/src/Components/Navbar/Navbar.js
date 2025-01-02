import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {FaHome, FaArrowLeft, FaBars, FaTimes} from 'react-icons/fa';
import Logout from '../Logout/Logout';
import './Navbar.css';
import logo from '../../Images/logo.jpg';
import Sidebar from '../Sidebar/Sidebar';
import {useAuth} from '../../Auth/AuthContext'
import '../../Pages/HomePage/HomePage.css';
import { FaBell } from "react-icons/fa";

const Navbar = ()=>{

    const navigate =useNavigate();
    const location = useLocation();


    const getRouteName = () =>{
        const path = location.pathname;
        
        const Home = 'Upload Trip Details';
        const FreightMaster = 'Freight Master';
        const VehicleMaster = 'Vehicle Master';
        const VendorMaster = 'Vendor Master';
        const Reports = 'Reports';
        const Billing = 'Billing';
        const Transactions = 'Transactions'
        const Business = 'Business';

        if(path === '/home'){
            return Home;
        }
        else if(path === '/freight'){
            return FreightMaster;
        }
        else if(path === '/vehicle'){
            return VehicleMaster;
        }
        else if(path === '/vendor'){
            return VendorMaster;
        }
        else if(path === '/reports'){
            return Reports;
        }
        else if(path === '/generate-bill'){
            return Billing;
        }
        else if(path === '/transactions'){
            return Transactions;
        }
        else if(path === '/business'){
            return Business;
        }
    };

    const handleBack = () =>{
        navigate('/home');
    };

    // const handleHome = () =>{
    //     navigate('/home');
    // };

    return(
        <nav className='navbar'>
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <div className='route-name'>
                {getRouteName()}
            </div>

            <div className='nav-buttons-right'>
            <button className='nav-button back-button'>
                    <FaBell className='button-icon'/>
                    
                </button>
                <button className='nav-button back-button'>
                    <FaArrowLeft className='button-icon' />
                    
                </button>
                <Logout />
            </div>
        </nav>
    );

};


export default Navbar;