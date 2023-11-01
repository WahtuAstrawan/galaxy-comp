import React, { useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UilEye, UilTrashAlt } from '@iconscout/react-unicons';
import mouse from './mouse.jpg';
import './TableHistory.css'
import { v4 as uuidv4 } from 'uuid';


const tableData = [
    {
        idtransaction:"",
        name: "Logitech G Pro X Superlight",
        cashier: "Arya Wiguna",
        price: "1,994,000",
        image: mouse,
        stored: "2.000.000",
        moneychanges: "6.000.000",
        promotion:"-",
        description: "Logitech G PRO X SUPERLIGHT Mouse Gaming Wireless with HERO Sensor 25K DPI, Ultra-Lightweight for eSports"
    },
];

function TableHistory() {
    const [modal, setModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const toggle = (product) => {
        setSelectedProduct(product);
        setModal(!modal);
    };

    return (
        <div className='table-products-section'>
            <div className="title" style={{ margin: "50px" }}>
                <h1>History</h1>
            </div>
            <div className="search-filter">

            </div>
            <Table className='table-info' style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Cashier</th>
                        <th>Price</th>
                        <th>Stored</th>
                        <th>Change</th>
                        <th>Promotion</th>
                        <th>Detail</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {Array(10).fill(0).map((_, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">{uuidv4()}</th>
                            <td>{tableData[0].name}</td>
                            <td>{tableData[0].cashier}</td>
                            <td>Rp.{tableData[0].price}</td>
                            <td>Rp.{tableData[0].stored}</td>
                            <td>Rp.{tableData[0].moneychanges}</td>
                            <td>{tableData[0].promotion}</td>
                            <td>
                                <a onClick={() => toggle(tableData[0])} className='actionhis1'>
                                    <UilEye></UilEye>
                                </a>
                            </td>
                            <td>
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

export default TableHistory;
