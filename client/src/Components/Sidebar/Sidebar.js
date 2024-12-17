import React from 'react';
import { FaTruck, FaCar, FaUserTie, FaChartBar, FaMoneyBill, FaClipboard } from 'react-icons/fa';
import './Sidebar.css';

import '../../Pages/HomePage/HomePage.css'

const Sidebar = ({ isCollapsed }) => {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <FaTruck className="icon" />
          {!isCollapsed && <span>Freight Master</span>}
        </li>
        <li className="sidebar-item">
          <FaCar className="icon" />
          {!isCollapsed && <span>Vehicle Master</span>}
        </li>
        <li className="sidebar-item">
          <FaUserTie className="icon" />
          {!isCollapsed && <span>Vendor Master</span>}
        </li>
        <li className="sidebar-item">
          <FaChartBar className="icon" />
          {!isCollapsed && <span>Reports</span>}
        </li>
        <li className="sidebar-item">
          <FaMoneyBill className="icon" />
          {!isCollapsed && <span>Billing</span>}
        </li>
        <li className="sidebar-item">
          <FaClipboard className="icon" />
          {!isCollapsed && <span>Expenses</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
