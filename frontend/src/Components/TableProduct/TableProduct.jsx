import React, { useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { UilEye } from '@iconscout/react-unicons';
import mouse from './mouse.jpg';
import './TableProduct.css';
import NavLand from '../../Components/NavLand/NavLand';

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

function TableProduct() {
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggle = (product) => {
    setSelectedProduct(product);
    setModal(!modal);
  };

  return (
    <div className='table-products-section'>
      <div className="title" style={{ margin: "50px" }}>
        <h1>Product List</h1>
      </div>
      <div className="search-filter">
        <NavLand />
      </div>
      <Table className='table-info' style={{ width: "100%", backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Detail</th>
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
                <a onClick={() => toggle(tableData[0])} className='detail-icon'>
                  <UilEye></UilEye>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination-section" color='info' style={{ borderBottom: "none" }}>
        <Pagination style={{ display: "flex", justifyContent: "center", borderBottom: "none" }}>
          <PaginationItem style={{borderBottom: "none"}}>
            <PaginationLink 
              first
              href="#"
            >
              First
            </PaginationLink>
          </PaginationItem >
          <PaginationItem style={{borderBottom: "none"}}>
            <PaginationLink
              href="#"
              previous
            >
              Previous
            </PaginationLink>
          </PaginationItem>
          <PaginationItem style={{borderBottom: "none"}}>
            <PaginationLink
              href="#"
              next
            >
              Next
            </PaginationLink>
          </PaginationItem>
          <PaginationItem style={{borderBottom: "none"}}>
            <PaginationLink
              href="#"
              last
            >
              Last
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>

      <Modal isOpen={modal} toggle={() => toggle(selectedProduct)}>
        <ModalHeader toggle={() => toggle(selectedProduct)}>
          {selectedProduct ? selectedProduct.name : ''}
        </ModalHeader>
        <ModalBody>
          {selectedProduct ? (
            <div>
              <img src={selectedProduct.image} alt='product-img' style={{ width: "100%", borderBottom:"none" }}></img>
              Product Description :
              <p style={{ textAlign: "justify" }}>{selectedProduct.description}</p>
              Price : Rp.{selectedProduct.price}
              <br />
              Stock : {selectedProduct.stock} Unit
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle(selectedProduct)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default TableProduct;
