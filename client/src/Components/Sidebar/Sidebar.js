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

  return (
    <aside className={`sidebar`}>
      <ul className="sidebar-menu">
        <li className="sidebar-item" onClick={handleHome}>
          <FaCloudUploadAlt className="icon" />
          <span>Upload Truck Details</span>
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
        <li className="sidebar-item" onClick={handleReports}>
          <FaChartBar className="icon" />
          <span>Reports</span>
        </li>
        <li className="sidebar-item">
          <FaMoneyBill className="icon" />
          <span>Billing</span>
        </li>
        <li className="sidebar-item" onClick={handleTransactions}>
          <FaMoneyCheckAlt className="icon" />
          <span>Transactions</span>
        </li>
        <li className="sidebar-item">
          <FaClipboard className="icon" />
          <span>Expenses</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
