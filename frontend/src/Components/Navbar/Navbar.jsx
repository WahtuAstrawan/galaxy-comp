import React, { useState } from 'react'
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
            style={{ backgroundColor:'black', fontWeight:"bold"}}
        >
          <NavbarBrand style={{ color:"white", fontSize:"25px", marginRight:"3rem"}}>
            <img src={logoComp} alt="logo" style={{ width:"50px", height:"50px", marginRight:"10px" }}/>
            Galaxy Comp
          </NavbarBrand>
          <Nav className='me-auto normal-navbar' >
            <NavLink href='#about-section' style={{ color:"white", width:"9rem" }}>About Us</NavLink>
            <NavLink href='#products-section' style={{ color:"white", width:"9rem" }}>Products</NavLink>
            <NavLink href='#contact-section' style={{ color:"white", width:"9rem" }}>Contact</NavLink>
          </Nav>
          <UncontrolledDropdown>
            <DropdownToggle color="light" className='dropdown-menu-main'>
              <UilBars></UilBars>
            </DropdownToggle>
            <DropdownMenu className='dropdown-menu'>
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
          </UncontrolledDropdown>
        </Navbar>
      </div>
    );
  }

export default NavbarLandingPage