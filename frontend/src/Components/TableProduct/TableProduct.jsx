import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink, Navbar, Nav, InputGroup, Input,  } from 'reactstrap';
import { UilEye, UilInfoCircle } from '@iconscout/react-unicons';
import './TableProduct.css';
import axios from 'axios';

function TableProduct() {
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [sortby, setSortby] = useState('');
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [activity, setActivity] = useState(0);

  const toggle = (product) => {
    setSelectedProduct(product);
    setModal(!modal);
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

  const handleSearch = () => {
    setActivity(activity + 1);
  };

  useEffect(() => {
    getProducts();
  }, [activity])

  return (
    <div className='table-products-section'>
      <div className="title" style={{ margin: "50px" }}>
        <h1>Available Products</h1>
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
                <Button onClick={() => toggle(product)} className="mx-0.5 bg-blue-400" color='info'>
                  <UilInfoCircle></UilInfoCircle>
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

      <Modal isOpen={modal} toggle={() => toggle(selectedProduct)}>
        <ModalHeader toggle={() => toggle(selectedProduct)}>
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
    </div>
  )
}

export default TableProduct;
