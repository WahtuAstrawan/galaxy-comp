import React, { useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { UilEye } from '@iconscout/react-unicons';
import mouse from './mouse.jpg';
import './TableProduct2.css';

const tableData = [
  {
    name: "Logitech G Pro X Superlight",
    category: "Mouse",
    sellprice: "1,994,000",
    baseprice: "1,000,000",
    image: mouse,
    stock: "25",
    sold: "104",
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
      <div className="titlebest" style={{ margin: "0px" }}>
        <tr>Best Selling Products</tr>
      </div>
      <Table className='table-info' style={{ width: "100%" }}>
      
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Sell Price</th>
            <th>Base Price</th>
            <th>Detail</th>
            <th>Stock</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {Array(10).fill(0).map((_, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{tableData[0].name}</td>
              <td>{tableData[0].category}</td>
              <td>Rp.{tableData[0].sellprice}</td>
              <td>{tableData[0].baseprice}</td>
              <td>
                <a onClick={() => toggle(tableData[0])} className="action1">
                  <UilEye></UilEye>
                </a>
              </td>
              <td>{tableData[0].stock} Unit</td>
              <td>{tableData[0].sold}</td>
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
          {selectedProduct ? selectedProduct.name : ''}
        </ModalHeader>
        <ModalBody>
          {selectedProduct && (
            <div>
              <img src={selectedProduct.image} alt='product-img' style={{ width: "100%" }}></img>
              Product Description:
              <p style={{ textAlign: "justify" }}>{selectedProduct.description}</p>
              Price: Rp.{selectedProduct.sellprice}
              <br />
              Stock: {selectedProduct.stock} Unit
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle(selectedProduct)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TableProduct;
