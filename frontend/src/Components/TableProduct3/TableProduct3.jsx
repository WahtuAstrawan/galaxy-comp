import React, { useEffect, useState } from 'react';
import { Table, Pagination, PaginationLink, PaginationItem, Navbar, Nav, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Alert } from 'reactstrap';
import { UilEdit, UilTrashAlt, UilInfoCircle, UilUserPlus, UilSearch, UilEye, UilPlusCircle } from '@iconscout/react-unicons';
import axios from 'axios';



function TableProduct3() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [modalDet, setModalDet] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const [search, setSearch] = useState('');
  const [sortby, setSortby] = useState('');
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [newPw, setNewPw] = useState('');
  const [activity, setActivity] = useState(0);
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [products, setProducts] = useState([]);
  const [newProd, setNewProd] = useState({
      name: '',
      stock: '',
      desc: '',
      basePrice: '',
      sellPrice: '',
      qtySold: '',
      category: '',
      productImg: ''
  });

  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const getProducts = async () => {

      const res = await axios.get("http://localhost:8080/product/filter", {headers: { 'auth': localStorage.getItem('token') }, params: {
          search,
          sortby,
          order,
          category,
          page
      }});
      setProducts(res.data.data);
  }

  const handleAddProd = async () => {
      try {
          toggleModalAdd();
          uploadImage();
          console.error(url);
          setNewProd({...newProd, profileImg: url});
          const res = await axios.post("http://localhost:8080/product/add", newProd, {headers: { 'auth': localStorage.getItem('token') }});

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

  const handleEditProd = async (id) => {
      try {
          setModalEdit(!modalEdit);
          if(image){
              uploadImage();
              setSelectedProd({...selectedProd, profileImg: url});
          }

          const res = await axios.put(`http://localhost:8080/product/edit/${id}`, {
              name: selectedProd.name,
              stock: selectedProd.stock,
              desc: selectedProd.desc,
              basePrice: selectedProd.basePrice,
              sellPrice: selectedProd.sellPrice,
              category: selectedProd.category,
              productImg: selectedProd.productImg,
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

  const handleDelProd = async (id) => {
      try {
          setModalDel(!modalDel);
          const res = await axios.delete(`http://localhost:8080/product/delete/${id}`, {headers: { 'auth': localStorage.getItem('token') }});
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

  const uploadImage = () => {
      if (image) {
          const formData = new FormData();
          formData.append("image", image);
          console.error(formData);

          axios.post("https://api.imgbb.com/1/upload", formData, {params: {key: 'e11ba24bc5858be6db517496779d5669'}}).then((res) => {
              console.error(res.data);
              setUrl(res.data.data.display_url);
          }).catch((err) => {
              console.error(err);
          });
      } else {
          setAlertMsg("Make sure to include an image");
          setColor('danger');
          setVisible(true);
      }
  };

  const toggle = (prod, show) => {
      setSelectedProd(prod);
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

  // useEffect(() => {
  //     getUsers();
  // }, [activity])

  return (
        <>
        <div>
          <Navbar style={{ backgroundColor: '#24262b', fontWeight: 'bold', height: '5rem' }}>
                <Nav className="me-auto-prod" id="normal-navbar-prod">
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
                        <option value="harddisk">Hard Disk</option>
                        <option value="speaker">Speaker</option>
                        <option value="laptop">laptop</option>
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
                        <option value="sellPrice">Sell Price</option>
                        <option value="stock" >Stock</option>
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
                <ModalHeader toggle={toggleModalAdd}>Add Product</ModalHeader>
                <ModalBody>
                    <Form>
                    <FormGroup>
                        <Label for="name">Product Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter product name"
                            onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="stock">Stock</Label>
                        <Input
                        type="text"
                        name="stock"
                        id="stock"
                        placeholder="Enter stock"
                        onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="desc">Description</Label>
                        <Input
                        type="text"
                        name="desc"
                        id="desc"
                        placeholder="Enter Description"
                        onChange={(e) => setNewProd({ ...newProd, desc: e.target.value })}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="basePrice">Base Price</Label>
                        <Input
                        type="text"
                        name="basePrice"
                        id="basePrice"
                        placeholder="Enter Base Price"
                        onChange={(e) => setNewProd({ ...newProd, basePrice: e.target.value })}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="sellPrice">Sell Price</Label>
                        <Input
                        type="text"
                        name="sellPrice"
                        id="sellPrice"
                        placeholder="Enter Sell Price"
                        onChange={(e) => setNewProd({ ...newProd, sellPrice: e.target.value })}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input
                            type="select"
                            name="category"
                            id="category"
                            onChange={(e) => {
                                setNewProd({ ...newProd, category: e.target.value });
                            }}
                            required
                        >
                            <option disabled selected>Select a category</option>
                            <option value="monitor">Monitor</option>
                            <option value="CPU">CPU</option>
                            <option value="keyboard">Keyboard</option>
                            <option value="mouse">Mouse</option>
                            <option value="printer">Printer</option>
                            <option value="harddisk">Hard Disk</option>
                            <option value="speaker">Speaker</option>
                            <option value="laptop">laptop</option>
                            <option value="headset">Headset</option>
                            <option value="lainnya">Lainnya</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Product Image</Label>
                        <Input
                        type="file"
                        name="image"
                        id="image"
                        accept='image/*'
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                        />
                    </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddProd}>
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
                    <h1>Product List</h1>
                </div>

                <Button style={{ marginRight: '100%', marginBottom: '10px', alignItems:'center', display: 'flex' }} color='primary' onClick={toggleModalAdd} className='px-5'>
                    <UilPlusCircle></UilPlusCircle>
                </Button>
                <div className="search-filter">
                </div>
                <Table className='table-info rounded-full' style={{ width: "100%" }} responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product Name</th>
                            <th>Stock</th>
                            <th>Base Price</th>
                            <th>Sell Price</th>
                            <th>Category</th>
                            <th>Detail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>{product.desc}</td>
                                <td>{product.basePrice}</td>
                                <td>{product.sellPrice}</td>
                                <td>{product.category}</td>
                                <td>
                                    <Button onClick={() => toggle(product, 1)} className="mx-0.5 bg-blue-400" color='info'>
                                        <UilInfoCircle></UilInfoCircle>
                                    </Button>
                                </td>
                                <td>
                                    <Button className="mx-2" color="warning" onClick={() => toggle(product, 2)}>
                                        <UilEdit></UilEdit>
                                    </Button>
                                    <Button className="actionprod2" color="danger" onClick={() => toggle(product, 3)}>
                                        <UilTrashAlt></UilTrashAlt>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal isOpen={modalDet} toggle={() => setModalDet(false)}>
                    <ModalHeader>
                        Detail Product
                    </ModalHeader>
                    <ModalBody>
                        {selectedProd ? (
                        <>
                            <div className='flex justify-center w-full'>
                                <img src={selectedProd.productImg} alt='profile-img' style={{ width: "50%", height: "50%" }} className='rounded-full'></img>
                            </div>
                            <div className='py-3'>
                                Product Name :
                                <p style={{ textAlign: "justify" }}>{selectedProd.name}</p>
                                Stock :
                                <p style={{ textAlign: "justify" }}>{selectedProd.stock}</p>
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
                        Edit Product
                    </ModalHeader>
                    <ModalBody>
                        {selectedProd ? (
                            <Form>
                                <FormGroup>
                                    <Label for="name">Product Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={selectedProd.name}
                                        onChange={(e) => setSelectedProd({ ...selectedProd, name: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="stock">Stock</Label>
                                    <Input
                                        type="number"
                                        name="stock"
                                        id="stock"
                                        value={selectedProd.stock}
                                        onChange={(e) => setSelectedProd({ ...selectedProd, stock: e.target.value })}
                                        required={true}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="desc">Stock</Label>
                                    <Input
                                        type="text"
                                        name="desc"
                                        id="desc"
                                        value={selectedProd.desc}
                                        onChange={(e) => setSelectedProd({ ...selectedProd, desc: e.target.value })}
                                        required={true}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="basePrice">Base Price</Label>
                                    <Input
                                        type="number"
                                        name="basePrice"
                                        id="basePrice"
                                        value={selectedProd.basePrice}
                                        onChange={(e) => setSelectedProd({ ...selectedProd, basePrice: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="sellPrice">Sell Price</Label>
                                    <Input
                                        type="number"
                                        name="sellPrice"
                                        id="sellPrice"
                                        value={selectedProd.sellPrice}
                                        onChange={(e) => setSelectedProd({ ...selectedProd, sellPrice: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="category">Category</Label>
                                    <Input
                                        type="select"
                                        name="category"
                                        id="category"
                                        value={selectedProd.category}
                                        onChange={(e) => setSelectedProd({ ...selectedProd, category: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select a category</option>
                                        <option value="monitor">Monitor</option>
                                        <option value="CPU">CPU</option>
                                        <option value="keyboard">Keyboard</option>
                                        <option value="mouse">Mouse</option>
                                        <option value="printer">Printer</option>
                                        <option value="harddisk">Hard Disk</option>
                                        <option value="speaker">Speaker</option>
                                        <option value="laptop">laptop</option>
                                        <option value="headset">Headset</option>
                                        <option value="lainnya">Lainnya</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="image">Product Image</Label>
                                    <Input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept='image/*'
                                    onChange={(e) => 
                                        setImage(e.target.files[0])
                                    }
                                    />
                                </FormGroup>
                            </Form>
                        ) : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={() => handleEditProd(selectedProd.productID)}>
                            Edit
                        </Button>
                        <Button color="secondary" onClick={() => setModalEdit(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDel} toggle={() => setModalDel(false)}>
                    <ModalHeader>
                        Delete Product
                    </ModalHeader>
                    <ModalBody>
                        {selectedProd ? 
                            (<p>{`Apakah kamu yakin menghapus product dengan nama : ${selectedProd.name} ?`}</p>)
                         : null }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => handleDelProd(selectedProd.productID)}>
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
              </div>

        </>
    );
  }
export default TableProduct3;
