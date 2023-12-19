import React from 'react'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import logoComp from './logo.png'
import { UilBars } from '@iconscout/react-unicons'
import {
    Navbar,
    Nav,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';


function NavbarLandingPage() {
    return (
      <div>
        <Navbar 
            style={{ backgroundColor:'#24262b', fontWeight:"bold"}}
        >
          <NavbarBrand style={{ color:"white", fontSize:"28px", marginRight:"3rem", display:"flex"}}>
            <img src={logoComp} alt="logo" className='w-20 h-20'/>
            <p className='mt-3 ml-3'>Galaxy Comp</p>
          </NavbarBrand>
          <Nav className='me-auto' id='normal-navbar'>
            <NavLink href='#about-section' style={{ color:"white", width:"9rem" }}><h6>About Us</h6></NavLink>
            <NavLink href='#products-section' style={{ color:"white", width:"9rem" }}> <h6>Products</h6></NavLink>
            <NavLink href='#contact-section' style={{ color:"white", width:"9rem" }}> <h6>Contact</h6></NavLink>
          </Nav>
          <UncontrolledDropdown className='dropdown-navbar'>
            <DropdownToggle color="light">
              <UilBars></UilBars>
              <DropdownMenu className='dropdown-navbar-menu'>
                <DropdownItem href='#about-section'>
                  About Us
                </DropdownItem>
                <DropdownItem href='#products-section'>
                  Products
                </DropdownItem>
                <DropdownItem href='#contact-section'>
                  Contact
                </DropdownItem>
              </DropdownMenu>
            </DropdownToggle>
          </UncontrolledDropdown>
        </Navbar>
      </div>
    );
  }

export default NavbarLandingPage