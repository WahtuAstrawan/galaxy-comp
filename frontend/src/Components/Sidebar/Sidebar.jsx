import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faShoppingCart, faHistory, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios';
import logo from './gcomp.png';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [modal, setModal] = useState(false)
  const navigate = useNavigate();

  const getUsername = async () => {
    try {
      const res = await axios.get("http://localhost:8080/login/username", {
        headers: { 'auth': localStorage.getItem('token') }
      });
      setUsername(res.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const handleLogout = () => {
    navigate("/login", {replace: true});
  }

  useEffect(() => {
    getUsername();
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <div className='sidebar'>
      <div className='logo-container'>
        <img src={logo} className='logo' alt='Galaxy Comp Logo' />
        <p>Galaxy Comp</p>
      </div>

      <ul className='text-menu-link'>
        <li><FontAwesomeIcon icon={faHome} /> <a href="/admin">Dashboard</a></li>
        <li><FontAwesomeIcon icon={faBars} /> <a href="/admin/transaction">Transaction</a></li>
        <li><FontAwesomeIcon icon={faHistory} /> <a href="/admin/history">History</a></li>
        {role === '7134' && (
          <>
            <li><FontAwesomeIcon icon={faShoppingCart} /> <a href="/admin/product">Products</a></li>
            <li><FontAwesomeIcon icon={faCog} /> <a href="/admin/account">Account</a></li>
          </>
        )}
        <li>
          Welcome {username} ! <br />
        </li>
        <li className='flex justify-center'>
          <Button className='btn-danger' onClick={() => {setModal(!modal)}}>
            Logout
          </Button>
        </li>
      </ul>
      <Modal isOpen={modal} toggle={() => setModal(false)}>
                    <ModalHeader>
                        Confirm Logout
                    </ModalHeader>
                    <ModalBody>
                        <p>Are you sure want to logout ?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => handleLogout()}>
                            Logout
                        </Button>
                        <Button color="secondary" onClick={() => setModal(false)}>
                            Close
                        </Button>
                    </ModalFooter>
        </Modal>
    </div>
  );
}

export default Sidebar;
