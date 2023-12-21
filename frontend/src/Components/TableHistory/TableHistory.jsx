import React, { useState, useEffect } from 'react';
import { Table, Pagination, PaginationLink, PaginationItem, Navbar, Nav, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Alert } from 'reactstrap';
import { UilEye, UilTrashAlt, UilPlusCircle, UilInfoCircle} from '@iconscout/react-unicons';
import axios from 'axios';
import moment from 'moment';



function TableHistory() {
    const [modalDel, setModalDel] = useState(false);
    const [modalDet, setModalDet] = useState(false);
    const [selectedHis, setSelectedHis] = useState(null);
    const [search, setSearch] = useState('');
    const [sortby, setSortby] = useState('');
    const [order, setOrder] = useState('');
    const [payMethod, setPayMet] = useState('');
    const [page, setPage] = useState(1);
    const [activity, setActivity] = useState(0);
    const [histories, setHistories] = useState([]);

    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    const getHistory = async () => {
        try {
            const res = await axios.get("http://localhost:8080/transaction/filter", {
                headers: { 'auth': localStorage.getItem('token') },
                params: {
                    search,
                    sortby,
                    order,
                    payMethod,
                    page
                }
            });
    
            const formattedHistory = res.data.data.map(history => ({
                ...history,
                transactionDate: moment(history.transactionDate).format('dddd, DD-MM-YYYY')
            }));

            setHistories(formattedHistory);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    }

    const handleDelHis = async (id) => {
        try {
            setModalDel(!modalDel);
            const res = await axios.delete(`http://localhost:8080/transaction/delete/${id}`, {headers: { 'auth': localStorage.getItem('token') }});
            if(res.data.success){
                setAlertMsg(res.data.message);
                setColor('success');
                setVisible(true);
                setActivity(activity + 1);
            }else{
                setAlertMsg(res.data.message);
                setColor('danger');
                setVisible(true);
            }
        } catch (error) {
            setAlertMsg("Delete process failed");
            setColor('danger');
            setVisible(true);
        }
    }

    const toggle = (his, show) => {
        setSelectedHis(his);
        if(show === 1){
            setModalDet(!modalDet);
        }else if(show === 2){
            setModalDel(!modalDel);
        }
      };
    
      const handleSearch = () => {
        setActivity(activity + 1);
      };

    useEffect(() => {
        getHistory();
    }, [activity])

    return (
        <>
            <div>
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
                        name="payMethod"
                        id="payMethod"
                        onChange={(e) => {
                            setPayMet(e.target.value)
                        }}
                        >
                        <option value='' selected>Payment filter</option>
                        <option value="cash">Cash</option>
                        <option value="bank">Bank</option>
                        <option value="qris">Qris</option>
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
                        <option value='' selected>Sort by</option>
                        <option value="customerName">Customer Name</option>
                        <option value="totalPrice">Total Price</option>
                        <option value="totalPay" >Total Pay</option>
                        <option value="transactionDate" >Transaction Date</option>
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
        
                <div className='mx-3'>
                    <Alert color={color} isOpen={visible} toggle={() => setVisible(false)} className='w-2/4 mt-3' style={{ marginLeft: '50%' }}>
                        {alertMsg}
                    </Alert>
                <div className="title" style={{ margin: "50px" }}>
                    <h1>History</h1>
                </div>

                <div className="search-filter">
                </div>
                <Table className='table-info rounded-full' style={{ width: "100%" }} responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Customer Name</th>
                            <th>Transaction Date</th>
                            <th>Total Price</th>
                            <th>Payment Method</th>
                            <th>Total Pay</th>
                            <th>Changes</th>
                            <th>Detail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {histories.map((history, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{history.customerName}</td>
                                <td>{history.transactionDate}</td>
                                <td>Rp.{history.totalPrice}</td>
                                <td>{history.payMethod}</td>
                                <td>Rp.{history.totalPay}</td>
                                <td>Rp.{history.changes}</td>
                                <td>
                                    <Button onClick={() => toggle(history, 1)} className="mx-0.5 bg-blue-400" color='info'>
                                        <UilInfoCircle></UilInfoCircle>
                                    </Button>
                                </td>
                                <td>
                                    <Button className="actionhis2" color="danger" onClick={() => toggle(history, 2)}>
                                        <UilTrashAlt></UilTrashAlt>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal isOpen={modalDet} toggle={() => setModalDet(false)}>
                    <ModalHeader>
                        Detail Transaction
                    </ModalHeader>
                    <ModalBody>
                        {selectedHis ? (
                        <>
                            <table className='table table-light'>
                            <thead>
                                <tr>
                                <th>Product ID</th>
                                <th>Quantity</th>
                                <th>Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedHis.detail_transactions.map((detail, index) => (
                                <tr key={index}>
                                    <td>{detail.productProductID}</td>
                                    <td>{detail.buyQty} Unit</td>
                                    <td>Rp.{detail.subTotal}</td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </>
                        ) : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => setModalDet(false)}>
                        Close
                        </Button>
                    </ModalFooter>
                    </Modal>

                <Modal isOpen={modalDel} toggle={() => setModalDel(false)}>
                    <ModalHeader>
                        Delete History
                    </ModalHeader>
                    <ModalBody>
                        {selectedHis ? 
                            (<p>{`Apakah kamu yakin menghapus history dengan ini?`}</p>)
                         : null }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => handleDelHis(selectedHis.transactionID)}>
                            Delete
                        </Button>
                        <Button color="secondary" onClick={() => setModalDel(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>

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
                            setPage(Math.ceil(histories.length / 10))
                            setActivity(activity+1)
                        }}
                        last
                        >
                        Last
                        </PaginationLink>
                    </PaginationItem>
                    </Pagination>
                </div>
            </div>
        </div>
        </>
    )
}

export default TableHistory;
