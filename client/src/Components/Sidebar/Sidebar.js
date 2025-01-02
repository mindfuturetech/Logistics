import React from 'react';
import { 
  FaTruck, 
  FaCar, 
  FaUserTie, 
  FaChartBar, 
  FaMoneyBill, 
  FaClipboard, 
  FaMoneyCheckAlt, 
  FaCloudUploadAlt 
} from 'react-icons/fa';
import './Sidebar.css';
import '../../Pages/HomePage/HomePage.css';
import { useNavigate } from 'react-router-dom';




const Sidebar = () => {
    const navigate = useNavigate();
    
    const handleHome = () =>{
        navigate('/home');
    };
    
    const handleReports = () =>{
        navigate('/reports');
    };
    const handleBusiness = () =>{
        navigate('/business');
    };

    const handleFreight = () =>{
        navigate('/freight');
    };

    const handleVehicle = () =>{
        navigate('/vehicle');
    };

    const handleVendor = () =>{
        navigate('/vendor');
    };

    const handleTransactions = () =>{
      navigate('/transactions');
    }

    const handleBilling = () =>{
      navigate('/generate-bill');
    }

  return (
    <aside className={`sidebar`}>
      <ul className="sidebar-menu">
        <li className="sidebar-item" onClick={handleHome}>
          <FaCloudUploadAlt className="icon" />
          <span>Upload Trip Details</span>
        </li>
        <li className="sidebar-item" onClick={handleFreight}>
          <FaTruck className="icon" />
          <span>Freight Master</span>
        </li>
        <li className="sidebar-item"  onClick={handleVehicle}>
          <FaCar className="icon" />
          <span>Vehicle Master</span>
        </li>
        <li className="sidebar-item" onClick={handleVendor}>
          <FaUserTie className="icon" />
          <span>Vendor Master</span>
        </li>
        <li className="sidebar-item repo" onClick={handleReports}>
          <FaChartBar className="icon" />
          <span>Reports</span>
        </li>
        <li className="sidebar-item bill" onClick={handleBilling}>
          <FaMoneyBill className="icon" />
          <span>Billing</span>
        </li>
        <li className="sidebar-item" onClick={handleTransactions}>
          <FaMoneyCheckAlt className="icon" />
          <span>Transactions</span>
        </li>
        <li className="sidebar-item" onClick={handleBusiness}>
          <FaClipboard className="icon" />
          <span>Business</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
