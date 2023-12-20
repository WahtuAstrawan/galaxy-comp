import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink, Navbar, Nav, InputGroup, Input, Form, FormGroup, Label } from 'reactstrap';
import { UilEye, UilPlus, UilInfoCircle } from '@iconscout/react-unicons';
import axios from 'axios';

import mouse from './mouse.jpg';

function TableProduct3() {
  const [modalDet, setModalDet] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [sortby, setSortby] = useState('');
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [activity, setActivity] = useState(0);
  const [detail, setDetail] = useState({
    buyQty: null,
    subTotal: null,
    productID: null,
    productName: ''
  });

  const [details, setDetails] = useState([]);

  const toggle = (product, show) => {
    setSelectedProduct(product);
    if(show === 1){
      setModalDet(!modalDet);
    }else if(show === 2){
      setModalAdd(!modalAdd);
    }else if(show === 3){
      setModalConfirm(!modalConfirm);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/dashboard/filter", {params: {
        search,
        sortby,
        order,
        category,
        page
      }});
      setProducts(res.data.data);

    } catch (error) {
      console.error(error);
    }
  }

  const handleAddCart = () => {
    setDetails([...details, { ...detail, productID: selectedProduct.productID, subTotal: selectedProduct.sellPrice * detail.buyQty, productName: selectedProduct.name }]);
    setModalAdd(false);
  }

  const handleDeleteFromCart = (index) => {
    // Update the state to remove the selected product from the cart
    const updatedDetails = [...details];
    updatedDetails.splice(index, 1);
    setDetails(updatedDetails);
  };

  const handleSearch = () => {
    setActivity(activity + 1);
  };

  useEffect(() => {
    getProducts();
  }, [activity])

  return (
    <div className='table-products-section'>
      <div className="title" style={{ margin: "50px" }}>
        <h1>Product List</h1>
      </div>
      <div className="search-filter">
        <Navbar style={{ backgroundColor: '#24262b', fontWeight: 'bold', height: '5rem' }}>
          <Nav className="me-auto" id="normal-navbar">
                    <InputGroup>
                    <div className='h-20'>
                        <Input
                        type="text"
                        placeholder="Search"
                        style={{ marginRight: '1rem', height: '50%' }}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        />
                    </div>
                    <div className='px-3'>
                        <Input
                        type="select"
                        name="category"
                        id="category"
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                        >
                        <option value='' selected>Category filter</option>
                        <option value="monitor">Monitor</option>
                        <option value="CPU">CPU</option>
                        <option value="keyboard">Keyboard</option>
                        <option value="mouse">Mouse</option>
                        <option value="printer">Printer</option>
                        <option value="harddisk">Harddisk</option>
                        <option value="speaker">Speaker</option>
                        <option value="laptop">Laptop</option>
                        <option value="headset">Headset</option>
                        <option value="lainnya">Lainnya</option>
                        </Input>
                    </div>
                    <div className='pr-3'>
                        <Input
                        type="select"
                        name="sortby"
                        id="sortby"
                        onChange={(e) => {
                            setSortby(e.target.value)
                        }}
                        >
                        <option value='' selected>Sortby</option>
                        <option value="name">Product Name</option>
                        <option value="stock">Stock</option>
                        <option value="desc">Desc</option>
                        <option value="sellPrice">Price</option>
                        <option value="qtySold">Qty Sold</option>
                        </Input>
                    </div>
                    <div className='pr-3'>
                        <Input
                        type="select"
                        name="order"
                        id="order"
                        onChange={(e) => {
                            setOrder(e.target.value)
                        }}
                        >
                        <option value='' selected>Order</option>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                        </Input>
                    </div>
                    <div className='inline-block'>
                        <Button color="info" onClick={handleSearch}>
                            Search
                        </Button>
                    </div>
                    </InputGroup>
                </Nav>
          </Navbar>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>Rp.{product.sellPrice}</td>
              <td>{product.stock} Unit</td>
              <td>
                <Button onClick={() => toggle(product, 1)} className="mx-0.5 bg-blue-400" color='info'>
                  <UilInfoCircle></UilInfoCircle>
                </Button>
              </td>
              <td>
                <Button onClick={() => toggle(product, 2)} className="mx-0.5 bg-blue-400" color='primary'>
                  Add
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination-section" color='info' style={{ borderBottom: "none" }}>
        <Pagination style={{ display: "flex", justifyContent: "center", borderBottom: "none" }}>
                    <PaginationItem disabled={page === 1} style={{borderBottom: "none"}}>
                        <PaginationLink 
                        first
                        onClick={() => {
                            setPage(1)
                            setActivity(activity+1)
                        }}
                        >
                        First
                        </PaginationLink>
                    </PaginationItem >
                    <PaginationItem disabled={page === 1} style={{borderBottom: "none"}}>
                        <PaginationLink
                        onClick={() => {
                            setPage(page - 1)
                            setActivity(activity+1)
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
                            setActivity(activity+1)
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
                            setActivity(activity+1)
                        }}
                        last
                        >
                        Last
                        </PaginationLink>
                    </PaginationItem>
          </Pagination>
      </div>
      
      <div className="title" style={{ margin: "50px" }}>
        <h1>Carts</h1>
      </div>

      <Table className='table-info' style={{ width: "100%", backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Buy Qty</th>
            <th>Sub Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
              {details.map((detail, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{detail.productName}</td>
                  <td>{detail.buyQty} Unit</td>
                  <td>Rp.{detail.subTotal}</td>
                  <td>
                    <Button onClick={() => handleDeleteFromCart(index)} className="mx-0.5 bg-blue-400" color='danger'>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      <Button color='success' onClick={() => {setModalConfirm(true)}}>
            Confirm Purchase
      </Button>

      <Modal isOpen={modalDet} toggle={() => toggle(selectedProduct, 1)}>
        <ModalHeader>
          {selectedProduct ? selectedProduct.name : ''}
        </ModalHeader>
        <ModalBody>
          {selectedProduct ? (
            <div>
              <img src={selectedProduct.productImg} alt='product-img' style={{ width: "100%", borderBottom:"none" }}></img>
              Product Description :
              <p style={{ textAlign: "justify" }}>{selectedProduct.desc}</p>
              Price : Rp.{selectedProduct.sellPrice}
              <br />
              Stock : {selectedProduct.stock} Unit
              <br />
              Qty Sold : {selectedProduct.qtySold} Unit
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle(selectedProduct)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalConfirm} toggle={() => toggle(selectedProduct, 3)}>
        <ModalHeader>
          Confirm your purchase
        </ModalHeader>
        <ModalBody>
          {selectedProduct ? (
            <div>
              <img src={selectedProduct.productImg} alt='product-img' style={{ width: "100%", borderBottom:"none" }}></img>
              Product Description :
              <p style={{ textAlign: "justify" }}>{selectedProduct.desc}</p>
              Price : Rp.{selectedProduct.sellPrice}
              <br />
              Stock : {selectedProduct.stock} Unit
              <br />
              Qty Sold : {selectedProduct.qtySold} Unit
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle(selectedProduct)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalAdd} toggle={() => toggle(selectedProduct, 2)}>
        <ModalHeader>
          Add to Cart
        </ModalHeader>
        <ModalBody>
          {selectedProduct ? (
            <>
              <div>
                Product Name : {selectedProduct.name}
                <br />
                Price : Rp.{selectedProduct.sellPrice}
                <br />
                Stock : {selectedProduct.stock} Unit
              </div>
              <br />
              <Form>
                <FormGroup>
                <Label for="buyQty">Buy Qty</Label>
                        <Input
                            type="number"
                            name="buyQty"
                            id="buyQty"
                            placeholder="Enter buy qty"
                            onChange={(e) => setDetail({ ...detail, buyQty: e.target.value })}
                            required
                        />
                        <Label for='subTotal'>Sub total</Label>
                        <Input
                            type="number"
                            name="subTotal"
                            id="subTotal"
                            placeholder="Enter full name"
                            value={detail.buyQty * selectedProduct.sellPrice}
                            onChange={(e) => setDetail({ ...detail, subTotal: e.target.value })}
                            required
                        />
                        <Input
                            type="hidden"
                            name="productID"
                            id="productID"
                            placeholder="Enter full name"
                            onChange={(e) => setDetail({ ...detail, productID: selectedProduct.productID })}
                            required
                        />
                </FormGroup>
              </Form>
            </>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAddCart} color='primary'>
            Confirm
          </Button>
          <Button color="secondary" onClick={() => toggle(selectedProduct, 2)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TableProduct3;

