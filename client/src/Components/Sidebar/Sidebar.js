import React from 'react';
import { FaTruck, FaCar, FaUserTie, FaChartBar, FaMoneyBill, FaClipboard, FaMoneyCheckAlt } from 'react-icons/fa';
import './Sidebar.css';

import '../../Pages/HomePage/HomePage.css'

const Sidebar = () => {
  return (
    <aside className={`sidebar`}>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <FaTruck className="icon" />
          <span>Freight Master</span>
        </li>
        <li className="sidebar-item">
          <FaCar className="icon" />
          <span>Vehicle Master</span>
        </li>
        <li className="sidebar-item">
          <FaUserTie className="icon" />
          <span>Vendor Master</span>
        </li>
        <li className="sidebar-item">
          <FaChartBar className="icon" />
          <span>Reports</span>
        </li>
        <li className="sidebar-item">
          <FaMoneyBill className="icon" />
          <span>Billing</span>
        </li>
        <li className="sidebar-item">
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
