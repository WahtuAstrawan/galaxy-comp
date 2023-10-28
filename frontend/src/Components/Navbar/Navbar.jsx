import React, { useState } from 'react'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logoComp from './logo.png'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';


function NavbarLandingPage() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar 
            style={{ backgroundColor:'darkblue', fontWeight:"bold" }}
        >
          <NavbarBrand href="#" style={{ color:"white", fontSize:"25px" }}>
            <img src={logoComp} alt="logo" style={{ width:"50px", height:"50px", marginRight:"10px" }}/>
            Galaxy Comp
          </NavbarBrand>
          <NavbarToggler onClick={toggle} style={{ backgroundColor:"white" }}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar style={{ borderRadius:"10px"}}>
              <NavItem>
                <NavLink href="#about-section" style={{ color:"white", borderTop:"1px solid white" }} className='link-menu'>
                    About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#product-section" style={{ color:"white" , borderTop:"1px solid white"}} className='link-menu'>
                    Product
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" style={{ color:"white", borderTop:"1px solid white"}} className='link-menu'>
                    Contact
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

export default NavbarLandingPage