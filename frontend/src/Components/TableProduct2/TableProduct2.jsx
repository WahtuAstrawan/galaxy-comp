import React, { useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UilEye, UilEdit, UilTrashAlt } from '@iconscout/react-unicons'; // Impor ikon edit dan delete
import mouse from './mouse.jpg';
import './TableProduct2.css';

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
                        <th>Action</th>
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
                                <Button className="action2" color="warning">
                                    <UilEdit></UilEdit> Edit
                                </Button>
                                <Button className="action2" color="danger">
                                    <UilTrashAlt></UilTrashAlt> Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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
