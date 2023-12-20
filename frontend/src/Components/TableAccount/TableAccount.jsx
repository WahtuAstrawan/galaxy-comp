import React, { useEffect, useState } from 'react';
import { Table, Pagination, PaginationLink, PaginationItem, Navbar, Nav, Input, Button, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Alert } from 'reactstrap';
import { UilEdit, UilTrashAlt, UilInfoCircle, UilUserPlus } from '@iconscout/react-unicons';
import axios from 'axios';

function TableAccount() {
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalDet, setModalDet] = useState(false);
    const [selectedAcc, setSelectedAcc] = useState(null);
    const [search, setSearch] = useState('');
    const [sortby, setSortby] = useState('');
    const [order, setOrder] = useState('');
    const [role, setRole] = useState('');
    const [page, setPage] = useState(1);
    const [newPw, setNewPw] = useState('');
    const [activity, setActivity] = useState(0);
    const [url, setUrl] = useState('');
    const [users, setUsers] = useState([]);
    const [newAcc, setNewAcc] = useState({
        fullName: '',
        email: '',
        telephone: '',
        username: '',
        password: '',
        role: '',
        address: ''
    });

    const [visible, setVisible] = useState(false);
    const [color, setColor] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    const getUsers = async () => {

        const res = await axios.get("http://localhost:8080/employee/filter", {headers: { 'auth': localStorage.getItem('token') }, params: {
            search,
            sortby,
            order,
            role,
            page
        }});
        setUsers(res.data.data);
    }

    const handleAddAcc = async () => {
        try {
            toggleModalAdd();
            console.error(url);
            const res = await axios.post("http://localhost:8080/employee/add", {
                fullName: newAcc.fullName,
                email: newAcc.email,
                telephone: newAcc.telephone,
                username: newAcc.username,
                password: newAcc.password,
                role: newAcc.role,
                address: newAcc.address,
                profileImg: url,
            }
            , {headers: { 'auth': localStorage.getItem('token') }});

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
            setAlertMsg("Make sure all input data is filled with correct format (required)");
            console.error(error)
            setColor('danger');
            setVisible(true);
        }
    };

    const handleEditAcc = async (id) => {
        try {
            setModalEdit(!modalEdit);
            const res = await axios.put(`http://localhost:8080/employee/edit/${id}`, {
                fullName: selectedAcc.fullName,
                email: selectedAcc.email,
                telephone: selectedAcc.telephone,
                username: selectedAcc.username,
                newPassword: newPw,
                role: selectedAcc.role,
                address: selectedAcc.address,
                profileImg: url
            }, {headers: { 'auth': localStorage.getItem('token') }});
            
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
            setAlertMsg("Make sure all input data is filled with correct format (required)");
            setColor('danger');
            setVisible(true);
        }
    }

    const handleDelAcc = async (id) => {
        try {
            setModalDel(!modalDel);
            const res = await axios.delete(`http://localhost:8080/employee/delete/${id}`, {headers: { 'auth': localStorage.getItem('token') }});
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

    const toggleModalAdd = () => {
        setModalAdd(!modalAdd);
      };

    const uploadImage = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        axios.post("https://api.imgbb.com/1/upload?key=1f11b71d1ad2a67aec0143de5ea5be1f", formData).then((res) => {
            setUrl(res.data.data.url);
        }).catch((err) => {
            console.error(err);
        })
    };

    const toggle = (acc, show) => {
        setSelectedAcc(acc);
        if(show === 1){
            setModalDet(!modalDet);
        }else if(show === 2){
            setModalEdit(!modalEdit);
        }else if(show === 3){
            setModalDel(!modalDel);
        }
      };
    
      const handleSearch = () => {
        setActivity(activity + 1);
      };

    useEffect(() => {
        getUsers();
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
                        name="role"
                        id="role"
                        onChange={(e) => {
                            setRole(e.target.value)
                        }}
                        >
                        <option value='' selected>Role filter</option>
                        <option value="admin">Admin</option>
                        <option value="cashier">Cashier</option>
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
                        <option value="fullName">Full Name</option>
                        <option value="email">Email</option>
                        <option value="telephone" >Telephone</option>
                        <option value="username" >Username</option>
                        <option value="address" >Address</option>
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

                <Modal isOpen={modalAdd} toggle={toggleModalAdd}>
                <ModalHeader toggle={toggleModalAdd}>Add Account</ModalHeader>
                <ModalBody>
                    <Form>
                    <FormGroup>
                        <Label for="fullName">Full Name</Label>
                        <Input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter full name"
                            onChange={(e) => setNewAcc({ ...newAcc, fullName: e.target.value })}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        onChange={(e) => setNewAcc({ ...newAcc, email: e.target.value })}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="telephone">Telephone</Label>
                        <Input
                        type="number"
                        name="telephone"
                        id="telephone"
                        placeholder="Enter telephone"
                        onChange={(e) => setNewAcc({ ...newAcc, telephone: e.target.value })}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter username"
                        onChange={(e) => setNewAcc({ ...newAcc, username: e.target.value })}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        onChange={(e) => setNewAcc({ ...newAcc, password: e.target.value })}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="role">Role</Label>
                        <Input
                            type="select"
                            name="role"
                            id="role"
                            onChange={(e) => {
                                setNewAcc({ ...newAcc, role: e.target.value });
                            }}
                            required
                        >
                            <option disabled selected>Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="cashier">Cashier</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input
                        type="textarea"
                        name="address"
                        id="address"
                        placeholder="Enter address"
                        onChange={(e) => setNewAcc({ ...newAcc, address: e.target.value })}
                        required={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Profile Image</Label>
                        <Input
                        type="file"
                        name="image"
                        id="image"
                        accept='image/*'
                        onChange={(e) => uploadImage(e)}
                        required
                        />
                    </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddAcc}>
                    Add
                    </Button>
                    <Button color="secondary" onClick={toggleModalAdd}>
                    Cancel
                    </Button>
                </ModalFooter>
                </Modal>

            </div>
            <div className='mx-3'>
                <Alert color={color} isOpen={visible} toggle={() => setVisible(false)} className='w-2/4 mt-3' style={{ marginLeft: '50%' }}>
                    {alertMsg}
                </Alert>
                <div className="title" style={{ margin: "50px" }}>
                    <h1>Account List</h1>
                </div>

                <Button style={{ marginRight: '100%', marginBottom: '10px', alignItems:'center', display: 'flex' }} color='primary' onClick={toggleModalAdd} className='px-5'>
                    <UilUserPlus></UilUserPlus>
                </Button>
                <div className="search-filter">
                </div>
                <Table className='table-info rounded-full' style={{ width: "100%" }} responsive>
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
                                    <Button onClick={() => toggle(user, 1)} className="mx-0.5 bg-blue-400" color='info'>
                                        <UilInfoCircle></UilInfoCircle>
                                    </Button>
                                </td>
                                <td>
                                    <Button className="mx-2" color="warning" onClick={() => toggle(user, 2)}>
                                        <UilEdit></UilEdit>
                                    </Button>
                                    <Button className="actionacc2" color="danger" onClick={() => toggle(user, 3)}>
                                        <UilTrashAlt></UilTrashAlt>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal isOpen={modalDet} toggle={() => setModalDet(false)}>
                    <ModalHeader>
                        Detail Account
                    </ModalHeader>
                    <ModalBody>
                        {selectedAcc ? (
                        <>
                            <div className='flex justify-center w-full'>
                                <img src={selectedAcc.profileImg} alt='profile-img' style={{ width: "50%", height: "50%" }} className='rounded-full'></img>
                            </div>
                            <div className='py-3'>
                                Fullname :
                                <p style={{ textAlign: "justify" }}>{selectedAcc.fullName}</p>
                                Address :
                                <p style={{ textAlign: "justify" }}>{selectedAcc.address}</p>
                            </div>
                        </>
                        ) : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => setModalDet(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalEdit} toggle={() => setModalEdit(false)}>
                    <ModalHeader>
                        Edit Account
                    </ModalHeader>
                    <ModalBody>
                        {selectedAcc ? (
                            <Form>
                                <FormGroup>
                                    <Label for="fullName">Full Name</Label>
                                    <Input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        value={selectedAcc.fullName}
                                        onChange={(e) => setSelectedAcc({ ...selectedAcc, fullName: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={selectedAcc.email}
                                        onChange={(e) => setSelectedAcc({ ...selectedAcc, email: e.target.value })}
                                        required={true}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="telephone">Telephone</Label>
                                    <Input
                                        type="number"
                                        name="telephone"
                                        id="telephone"
                                        value={selectedAcc.telephone}
                                        onChange={(e) => setSelectedAcc({ ...selectedAcc, telephone: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={selectedAcc.username}
                                        onChange={(e) => setSelectedAcc({ ...selectedAcc, username: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="newPassword">New Password</Label>
                                    <Input
                                        type="password"
                                        name="newPassword"
                                        id="newPassword"
                                        value={newPw}
                                        onChange={(e) => setNewPw(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="role">Role</Label>
                                    <Input
                                        type="select"
                                        name="role"
                                        id="role"
                                        value={selectedAcc.role}
                                        onChange={(e) => setSelectedAcc({ ...selectedAcc, role: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select a role</option>
                                        <option value="admin">Admin</option>
                                        <option value="cashier">Cashier</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input
                                        type="textarea"
                                        name="address"
                                        id="address"
                                        value={selectedAcc.address}
                                        onChange={(e) => setSelectedAcc({ ...selectedAcc, address: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="image">Profile Image</Label>
                                    <Input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept='image/*'
                                    onChange={(e) => 
                                        uploadImage(e)
                                    }
                                    />
                                </FormGroup>
                            </Form>
                        ) : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={() => handleEditAcc(selectedAcc.employeeID)}>
                            Edit
                        </Button>
                        <Button color="secondary" onClick={() => setModalEdit(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDel} toggle={() => setModalDel(false)}>
                    <ModalHeader>
                        Delete Account
                    </ModalHeader>
                    <ModalBody>
                        {selectedAcc ? 
                            (<p>{`Apakah kamu yakin menghapus akun dengan username : ${selectedAcc.username} ?`}</p>)
                         : null }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => handleDelAcc(selectedAcc.employeeID)}>
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
                            setPage(Math.ceil(users.length / 10))
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
        </>
    )
}

export default TableAccount;