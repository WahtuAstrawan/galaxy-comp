import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UilEye, UilEdit, UilTrashAlt } from '@iconscout/react-unicons';
import axios from 'axios';

import './TableAccount.css';

function TableAccount() {
    const [modal, setModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [search, setSearch] = useState('');
    const [sortby, setSortby] = useState('');
    const [order, setOrder] = useState('');
    const [role, setRole] = useState('');
    const [submitAcc, setSubmitAcc] = useState(0);
    const [users, setUsers] = useState([]);

    const toggle = (product) => {
        setSelectedProduct(product);
        setModal(!modal);
    };

    const getUsers = async () => {
        const res = await axios.get("http://localhost:8080/employee/filter", {headers: { 'auth': localStorage.getItem('token') }}, {params: {
            search: search,
            sortby: sortby,
            order: order,
            role: role
        }});
        setUsers(res.data.data);
    }

    useEffect(() => {
        getUsers();
    }, [submitAcc])

    return (
        <div className='table-products-section'>
            <div className="title" style={{ margin: "50px" }}>
                <h1>Account List</h1>
            </div>
            <div className="search-filter">

            </div>
            <Table className='table-info rounded-full' style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Detail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.telephone}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <a onClick={() => toggle(user)} className="actionacc1">
                                    <UilEye></UilEye>
                                </a>
                            </td>
                            <td>
                                <Button className="actionacc2" color="warning">
                                    <UilEdit></UilEdit>
                                </Button>
                                <Button className="actionacc2" color="danger">
                                    <UilTrashAlt></UilTrashAlt>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal isOpen={modal} toggle={() => toggle(selectedProduct)}>
                <ModalHeader toggle={() => toggle(selectedProduct)}>
                    {selectedProduct ? selectedProduct.fullName : ''}
                </ModalHeader>
                <ModalBody>
                    {selectedProduct ? (
                        <div>
                            {/* Display other details as needed */}
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