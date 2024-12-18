import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {FaHome, FaArrowLeft, FaBars, FaTimes} from 'react-icons/fa';
import Logout from '../Logout/Logout';
import './Navbar.css';
import logo from '../../Images/logo.jpg';
import Sidebar from '../Sidebar/Sidebar';
import {useAuth} from '../../Auth/AuthContext'
import '../../Pages/HomePage/HomePage.css';

const Navbar = ({toggleSidebar, isCollapsed})=>{

    const navigate =useNavigate();
    const location = useLocation();


    const getRouteName = () =>{
        const path = location.pathname;
        
        const Home = 'Upload Truck Details';
        const FreightMaster = 'Freight Master';
        const VehicleMaster = 'Vehicle Master';
        const VendorMaster = 'Vendor Master';
        const Reports = 'Reports';
        const Billing = 'Billing';
        const Transactions = 'Transactions'
        const Expenses = 'Expenses';

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
        else if(path === '/'){
            return Billing;
        }
        else if(path === '/'){
            return Transactions;
        }
        else if(path === '/'){
            return Expenses;
        }
    };

    const handleBack = () =>{
        navigate(-1);
    };

    // const handleHome = () =>{
    //     navigate('/home');
    // };

    return(
        <nav className='navbar'>
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="logo" />
                {/* <button className="nav-button home-button" onClick={handleHome}>
                    <FaHome className="button-icon" />
                    <span>Home</span>
                </button> */}
            </div>

            <div className='route-name'>
                {getRouteName()}
            </div>

            <div className='nav-buttons-right'>
                <button className='nav-button back-button' onClick={handleBack}>
                    <FaArrowLeft className='button-icon' />
                    <span>Back</span>
                </button>
                <Logout />
            </div>
        </nav>
    );

};


export default Navbar;