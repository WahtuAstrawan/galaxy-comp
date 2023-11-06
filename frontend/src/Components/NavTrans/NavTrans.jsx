import React from 'react';
import './NavTrans.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UilBars } from '@iconscout/react-unicons';
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';


function NavbarTransPage() {
  return (
    <div>
      <Navbar style={{ backgroundColor: '#24262b', fontWeight: 'bold' }}>
        {/* <NavbarBrand style={{ color: 'white', fontSize: '28px', marginRight: '3rem' }}>
          <img src={logoComp} alt="logo" style={{ width: '50px', height: '50px', marginRight: '10px' } />
          Galaxy Comp
        </NavbarBrand> */}
        <Nav className="me-auto" id="normal-navbar">
          <InputGroup>
            <Input placeholder="Search" style={{ marginRight: '1rem' }} />
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ color: 'white' }}>
                Category
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Mouse</DropdownItem>
                <DropdownItem>Keyboard</DropdownItem>
                <DropdownItem>Monitor</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </InputGroup>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarTransPage;