import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { UilEye, UilInfoCircle } from '@iconscout/react-unicons';
import axios from 'axios';
import mouse from './mouse.jpg';
import './TableProduct2.css';

function TableProduct2() {
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const toggle = (product) => {
    setSelectedProduct(product);
    console.log(selectedProduct);
    setModal(!modal);
  };

  const getTrend = async () => {
    const res = await axios.get("http://localhost:8080/dashboard/trend", {params: {page}});
    console.log(res.data.data);
    setProducts(res.data.data)
  }

  useEffect(() => {
    getTrend();
  }, [page])

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
          {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>Rp.{product.sellPrice}</td>
              <td>Rp.{product.basePrice}</td>
              <td>
                <Button onClick={() => toggle(product)} className="mx-0.5 bg-blue-400" color='info'>
                  <UilInfoCircle></UilInfoCircle>
                </Button>
              </td>
              <td>{product.stock} Unit</td>
              <td>{product.qtySold} Unit</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination-section2" color='info' style={{borderBottom: "none"}}>
      <Pagination style={{ display: "flex", justifyContent: "center", borderBottom: "none" }}>
        <PaginationItem disabled={page === 1} style={{borderBottom: "none"}}>
                        <PaginationLink 
                        first
                        onClick={() => {
                            setPage(1)
                        }}
                        >
                        First
                        </PaginationLink>
                    </PaginationItem >
                    <PaginationItem disabled={page === 1} style={{borderBottom: "none"}}>
                        <PaginationLink
                        onClick={() => {
                            setPage(page - 1)
                        }}
                        previous
                        >
                        Previous
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem style={{borderBottom: "none"}}>
                        <PaginationLink
                        onClick={() => {
                            setPage(page + 1)
                        }}
                        next
                        >
                        Next
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem style={{borderBottom: "none"}}>
                        <PaginationLink
                        onClick={() => {
                            setPage(Math.ceil(products.length / 10))
                        }}
                        last
                        >
                        Last
                        </PaginationLink>
                    </PaginationItem>
          </Pagination>
      </div>

      <Modal isOpen={modal} toggle={() => toggle(selectedProduct)}>
        <ModalHeader toggle={() => toggle(selectedProduct)}>
          Detail Product
        </ModalHeader>
        <ModalBody>
          {selectedProduct && (
            <div>
              <img src={selectedProduct.productImg} alt='product-img' style={{ width: "100%" }}></img>
              <bold>Product Name:</bold>{selectedProduct.name}
              <br />
              Product Description:
              <p style={{ textAlign: "justify" }}>{selectedProduct.desc}</p>
              Price   : Rp.{selectedProduct.sellPrice}
              <br />
              Stock   : {selectedProduct.stock} Unit
              <br />
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

export default TableProduct2;
