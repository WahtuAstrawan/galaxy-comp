import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink, Navbar, Nav, InputGroup, Input, Form, FormGroup, Label, Alert } from 'reactstrap';
import { UilEye, UilPlus, UilInfoCircle } from '@iconscout/react-unicons';
import axios from 'axios';

function TableProduct3() {
  const [modalDet, setModalDet] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [sortby, setSortby] = useState('');
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [activity, setActivity] = useState(0);
  const [colorCart, setColorCart] = useState('');  
  const [visibleCart, setVisibleCart] = useState(false); 
  const [alertCartMsg, setAlertCartMsg] = useState('');  

  const [newTrans, setNewTrans] = useState({
    customerName: '',
    payMethod: '',
    totalPrice: 0,
    totalPay: null,
    changes: null,
    employeeID: 0,
  })

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

  const calculateTotalPrice = () => {
    return details.reduce((acc, detail) => acc + detail.subTotal, 0);
  };

  const handleAddTrans = async () => {
    try {
      const totalPrice = calculateTotalPrice();

      const res = await axios.get("http://localhost:8080/login/id", {headers: {'auth': localStorage.getItem('token')}});
      console.error(res.data);
      
      setId(res.data.id);
      const postData = {
        customerName: newTrans.customerName,
        payMethod: newTrans.payMethod,
        totalPrice: totalPrice,
        totalPay: newTrans.totalPay,
        changes: newTrans.changes,
        employeeID: id,
        details: details.map((detail) => ({
          productID: detail.productID,
          buyQty: detail.buyQty,
          subTotal: detail.subTotal,
        })),
      };
  
      const response = await axios.post("http://localhost:8080/transaction/add", postData, {headers: {'auth': localStorage.getItem('token')}});

      setDetails([]);
      setModalConfirm(false);
      setActivity(activity+1);

      setAlertCartMsg('Transaction added successfully');
      setColorCart('success');
      setVisibleCart(true);
    } catch (error) {
      console.error(error);

      setAlertCartMsg('Error adding transaction');
      setColorCart('danger');
      setVisibleCart(true);
    }
  };

  

  const handleAddCart = () => {
    setDetails([...details, { ...detail, productID: selectedProduct.productID, subTotal: selectedProduct.sellPrice * detail.buyQty, productName: selectedProduct.name }]);
    setModalAdd(false);

    setAlertCartMsg('Product added to cart successfully');
    setColorCart('success');
    setVisibleCart(true);
  }

  const handleDeleteFromCart = (index) => {
    const updatedDetails = [...details];
    updatedDetails.splice(index, 1);
    setDetails(updatedDetails);

    setAlertCartMsg('Product removed from cart successfully');
    setColorCart('success');
    setVisibleCart(true);
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
      <Alert color={colorCart} isOpen={visibleCart} toggle={() => setVisibleCart(false)} className='w-2/4 mt-3' style={{ marginLeft: '50%' }}>
        {alertCartMsg}
      </Alert>
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
      
      <div className="title" style={{ marginTop: "10px" }}>
        <h1>Carts</h1>
      </div>

      <Table className='table-info' style={{ width: "100%", backgroundColor: "white"}}>
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
      {details[0] ? (
        <Button color='success' onClick={() => {setModalConfirm(true)}}>
              Confirm Purchase
        </Button>
      ) : null}


      <Modal isOpen={modalDet} toggle={() => toggle(selectedProduct, 1)}>
        <ModalHeader>
          Detail Product
        </ModalHeader>
        <ModalBody>
          {selectedProduct ? (
            <div>
              <img src={selectedProduct.productImg} alt='product-img' style={{ width: "70%", borderBottom:"none" }}></img>
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
          <Button color="secondary" onClick={() => toggle(selectedProduct, 1)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalConfirm} toggle={() => toggle(selectedProduct, 3)}>
        <ModalHeader>
          Confirm your purchase
        </ModalHeader>
        <ModalBody>
            <Label>Detail Purchase</Label>
            <Table className='table-light' style={{ width: "100%", backgroundColor: "white"}}>
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Buy Qty</th>
                <th>Sub Total</th>
              </tr>
            </thead>
            <tbody>
                  {details.map((detail, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{detail.productName}</td>
                      <td>{detail.buyQty} Unit</td>
                      <td>Rp.{detail.subTotal}</td>
                    </tr>
                  ))}
            </tbody>
            </Table>
            <Label>Total Price</Label>
            <Input
              type="number"
              name="totalPrice"
              id="totalPrice"
              placeholder="Total Price"
              value={details.reduce((acc, detail) => acc + detail.subTotal, 0)}
              onChange={(e) => setNewTrans({ ...newTrans, totalPrice: e.target.value })}
              required
              />
            <Label>Total Pay</Label>
            <Input
              type="number"
              name="totalPay"
              id="totalPay"
              placeholder="Enter Customer Pay"
              onChange={(e) => {
                const totalPay = parseFloat(e.target.value);
                const changes = -(details.reduce((acc, detail) => acc + detail.subTotal, 0) - totalPay);
                setNewTrans({ ...newTrans, totalPay, changes });
              }}
              required
            />
            <Label>Pay Method</Label>
            <Input
              type="select"
              name="payMethod"
              id="payMethod"
              onChange={(e) => setNewTrans({ ...newTrans, payMethod: e.target.value })}
              required
            >
              <option value='' selected>Pay Method</option>
              <option value="bank">Bank</option>
              <option value="qris">Qris</option>
              <option value="cash">Cash</option>
            </Input>

            <Label>Changes</Label>
            <Input
              type="number"
              name="changes"
              id="changes"
              placeholder="Changes"
              value={newTrans.changes || 0}
              required
            />
            <Label>Customer Name</Label>
            <Input
              type="text"
              name="customerName"
              id="customerName"
              placeholder="Enter customer name"
              onChange={(e) => setNewTrans({ ...newTrans, customerName: e.target.value })}
              required
            />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => handleAddTrans()}>
            Add
          </Button>
          <Button color="secondary" onClick={() => toggle(selectedProduct, 3)}>
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
                            placeholder="Enter Buy Qty"
                            onChange={(e) => setDetail({ ...detail, buyQty: e.target.value })}
                            required
                        />
                        <Label for='subTotal'>Sub total</Label>
                        <Input
                            type="number"
                            name="subTotal"
                            id="subTotal"
                            placeholder="Subtotal"
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

