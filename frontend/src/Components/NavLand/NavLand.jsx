import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

function NavbarLandingPage() {
  const [modal, setModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    sellPrice: '',
    basePrice: '',
    image: null, // Change to null since it will be a File object
    description: '',
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    // Use the File object for 'image' field
    const image = type === 'file' ? files[0] : value;

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: image,
    }));
  };

  const handleAddProduct = () => {
    // Implement your logic to add the new product
    console.log('New Product:', newProduct);
    toggleModal(); // Close the modal after adding the product (you may need to add further logic here)
  };

  return (
    <div>
      <Navbar style={{ backgroundColor: '#24262b', fontWeight: 'bold' }}>
        <Nav className="me-auto" id="normal-navbar">
          <InputGroup>
            <Input placeholder="Search" style={{ marginRight: '1rem' }} />
            <UncontrolledDropdown>
                    <DropdownToggle style={{ color: 'white' }}>
                      Filter
                      <DropdownMenu>
                        <DropdownItem>Mouse</DropdownItem>
                        <DropdownItem>Keyboard</DropdownItem>
                        <DropdownItem>Monitor</DropdownItem>
                      </DropdownMenu>
                    </DropdownToggle>
            </UncontrolledDropdown>
            <UncontrolledDropdown>
                <DropdownToggle style={{ color: 'white' }}>
                        Sort by
                        <DropdownMenu>
                          <DropdownItem>Name</DropdownItem>
                          <DropdownItem>Price</DropdownItem>
                          <DropdownItem>Stock</DropdownItem>
                        </DropdownMenu>
                </DropdownToggle>
              </UncontrolledDropdown>
                <UncontrolledDropdown>
                    <DropdownToggle style={{ color: 'white' }}>
                            Priority
                            <DropdownMenu>
                              <DropdownItem>Ascending</DropdownItem>
                              <DropdownItem>Descending</DropdownItem>
                            </DropdownMenu>
                    </DropdownToggle>
                </UncontrolledDropdown>
          </InputGroup>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarLandingPage;
