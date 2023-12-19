import React, { useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { UilEye, UilEdit, UilTrashAlt } from '@iconscout/react-unicons';
import mouse from './mouse.jpg';
import './TableProduct3.css';

const tableData = [
  {
    name: "Logitech G Pro X Superlight",
    category: "Mouse",
    price: "1,994,000",
    image: mouse,
    stock: "25",
    description: "Logitech G PRO X SUPERLIGHT Mouse Gaming Wireless with HERO Sensor 25K DPI, Ultra-Lightweight for eSports"
  },
];

function TableProduct3() {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

  const toggle = (product) => {
    setSelectedProduct(product);
    setEditedProduct(product);
    setModal(!modal);
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const handleSaveEdit = () => {
    // Implement your save edit logic here
    console.log('Save Edit button clicked for product:', editedProduct);
    setModal(false);
    setEditedProduct(null);
  };

  const handleCancelEdit = () => {
    console.log('Cancel Edit button clicked');
    setModal(false);
    setEditedProduct(null);
  };

  const handleDelete = () => {
    // Implement your delete logic here
    console.log('Delete button clicked for product:', selectedProduct);
    setDeleteModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className='table-products-section'>
      <div className="title" style={{ margin: "50px" }}>
        <h1>Product List</h1>
      </div>
      <div className="search-filter"></div>
      <Table className='table-info' style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Detail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array(10).fill(0).map((_, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{tableData[0].name}</td>
              <td>{tableData[0].category}</td>
              <td>Rp.{tableData[0].price}</td>
              <td>{tableData[0].stock} Unit</td>
              <td>
                <a onClick={() => toggle(tableData[0])} className="action1">
                  <UilEye></UilEye>
                </a>
              </td>
              <td>
                <Button className="action2 edit" color="warning" onClick={() => toggle(tableData[0])}>
                  <UilEdit></UilEdit>
                </Button>
                <Button className="action2 delete" color="danger" onClick={toggleDeleteModal}>
                  <UilTrashAlt></UilTrashAlt>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination-section2" color='info'>
        <Pagination style={{ justifyContent: "center", margin: "20px 0" }}>
          <PaginationItem>
            <PaginationLink first href="#">
              First
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous href="#">
              Previous
            </PaginationLink>
          </PaginationItem>
         
          <PaginationItem>
            <PaginationLink next href="#">
              Next
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last href="#">
              Last
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>

      <Modal isOpen={modal} toggle={() => toggle(selectedProduct)}>
        <ModalHeader toggle={() => toggle(selectedProduct)}>
          {selectedProduct ? `Edit ${selectedProduct.name}` : ''}
        </ModalHeader>
        <ModalBody>
          {editedProduct ? (
            <div>
              <label>Product Name:</label>
              <input type="text" name="name" value={editedProduct.name} onChange={handleInputChange} />

              <label>Category:</label>
              <input type="text" name="category" value={editedProduct.category} onChange={handleInputChange} />

              <label>Price:</label>
              <input type="text" name="price" value={editedProduct.price} onChange={handleInputChange} />

              <label>Stock:</label>
              <input type="text" name="stock" value={editedProduct.stock} onChange={handleInputChange} />

              <label>Detail:</label>
              <textarea name="description" value={editedProduct.description} onChange={handleInputChange}></textarea>
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveEdit}>
            Save
          </Button>
          <Button color="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>
          {selectedProduct ? `Delete ${selectedProduct.name}` : ''}
        </ModalHeader>
        <ModalBody>
          {selectedProduct ? (
            <p>Apakah Anda yakin ingin menghapus produk "{selectedProduct.name}"?</p>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TableProduct3;
