import React, { useState } from 'react';
import { Navbar, Nav, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';

function NavbarTransPage() {
  const [modal, setModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    sellPrice: '',
    basePrice: '',
    image: null,
    description: '',
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const image = type === 'file' ? files[0] : value;

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: image,
    }));
  };

  const handleAddProduct = () => {
    console.log('New Product:', newProduct);
    toggleModal();
  };

  return (
    <div>
      <Navbar style={{ backgroundColor: '#24262b', fontWeight: 'bold' }}>
        <Nav className="me-auto" id="normal-navbar">
          <InputGroup>
            <Input placeholder="Search" style={{ marginRight: '1rem' }} />
            <UncontrolledDropdown>
              <DropdownToggle style={{ color: 'white' }}>
                Role    
                <DropdownMenu>
                  <DropdownItem>Admin</DropdownItem>
                  <DropdownItem>Cashier</DropdownItem>
                </DropdownMenu>
              </DropdownToggle>
            </UncontrolledDropdown>
            <UncontrolledDropdown>
              <DropdownToggle style={{ color: 'white' }}>
                Sort by
                <DropdownMenu>
                  <DropdownItem>Name</DropdownItem>
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
        <Button color="primary" onClick={toggleModal}>
          Add
        </Button>
      </Navbar>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="productName">Product Name</Label>
              <Input
                type="text"
                name="name"
                id="productName"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={newProduct.category}
                onChange={handleInputChange}
              >
                <option>Mouse</option>
                <option>Keyboard</option>
                <option>Monitor</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="sellPrice">Sell Price</Label>
              <Input
                type="text"
                name="sellPrice"
                id="sellPrice"
                placeholder="Enter sell price"
                value={newProduct.sellPrice}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="basePrice">Base Price</Label>
              <Input
                type="text"
                name="basePrice"
                id="basePrice"
                placeholder="Enter base price"
                value={newProduct.basePrice}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                type="file"
                name="image"
                id="image"
                accept=".jpg, .jpeg"
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Product Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NavbarTransPage;
