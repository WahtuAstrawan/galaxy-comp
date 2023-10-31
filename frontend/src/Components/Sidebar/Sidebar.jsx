import React, { useState } from 'react';
import './Sidebar.css'; // Buat file CSS terpisah untuk styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './gcomp.png'
import { faBars, faChevronLeft, faHome, faShoppingCart, faHistory, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className='sidebar'>
        <div className='logo-container'>
          <img src={logo} className='logo' />
          <p>Galaxy Comp</p>

        <ul className='text-menu-link'>
          <li><FontAwesomeIcon icon={faHome}/> <a href="#dashboard">Dashboard</a></li>
          <li><FontAwesomeIcon icon={faShoppingCart}/> <a href="#products">Products</a></li>
          <li><FontAwesomeIcon icon={faBars}/> <a href="#transaction">Transaction</a></li>
          <li><FontAwesomeIcon icon={faHistory} /> <a href="#history">History</a></li>
          <li><FontAwesomeIcon icon={faCog} /> <a href="#account">Account</a></li>
          <li><FontAwesomeIcon icon={faUser} /> <a href="#profile">Profile</a></li>
          <FontAwesomeIcon icon="fa-regular fa-money-simple-from-bracket" />
        </ul>
        </div>
      </div>
  );
}

export default Sidebar;
