import React, { useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { UilEye, UilSearch } from '@iconscout/react-unicons';
import mouse from './mouse.jpg';
import './TableProduct.css'

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
                <InputGroup>
                    <Input placeholder="Search..." style={{ border:"1px solid grey" }}/>
                    <Button color="primary" style={{ width:"5rem" }}>
                        <UilSearch></UilSearch>
                    </Button>
                </InputGroup>
            </div>
            <Table className='table-info' style={{ width: "100%" }}>
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
            <div className="pagination-section" color='info'>
                <Pagination style={{ display:"flex", justifyContent:"center" }}>
                <PaginationItem>
                    <PaginationLink
                    first
                    href="#"
                    >
                        First
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                    href="#"
                    previous
                    >
                        Previous
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                    1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                    2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                    3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                    4
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                    5
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                    href="#"
                    next
                    >
                        Next
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
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
                            <img src={selectedProduct.image} alt='product-img' style={{ width:"100%" }}></img>
                            Product Description :
                            <p style={{ textAlign:"justify" }}>{selectedProduct.description}</p>
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