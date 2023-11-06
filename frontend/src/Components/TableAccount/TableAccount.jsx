import React, { useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UilEye, UilEdit, UilTrashAlt } from '@iconscout/react-unicons'; // Impor ikon edit dan delete
import office from './office.jpg';
import './TableAccount.css'


const tableData = [
    {
        name: "Arya Wiguna",
        role: "Cashier",
        status: "active",
        image: office,
        contact: "08123232323",
    },
];

function TableAccount() {
    const [modal, setModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const toggle = (product) => {
        setSelectedProduct(product);
        setModal(!modal);
    };

    return (
        <div className='table-products-section'>
            <div className="title" style={{ margin: "50px" }}>
                <h1>Account List</h1>
            </div>
            <div className="search-filter">

            </div>
            <Table className='table-info' style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Contact</th>
                        <th>Detail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array(20).fill(0).map((_, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{tableData[0].name}</td>
                            <td>{tableData[0].role}</td>
                            <td>{tableData[0].status}</td>
                            <td>{tableData[0].contact}</td>
                            <td>
                                <a onClick={() => toggle(tableData[0])} className="action1">
                                    <UilEye></UilEye>
                                </a>
                            </td>
                            <td>
                                <Button className="actionacc2" color="warning">
                                    <UilEdit></UilEdit> Edit
                                </Button>
                                <Button className="actionacc2" color="danger">
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
                            <br />
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

export default TableAccount;
