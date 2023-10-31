import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import keyboard from './gamen.png';
import './Products.css';

const cardData = [
  {
    title: 'Gamen Titan III',
    category: 'Keyboard',
    imageSrc: keyboard,
    description: 'Gamen Titan III adalah keyboard gaming mekanik dengan kabel panjang. Dilengkapi dengan Outemu Blue Switch yang kuat hingga 50 juta kali klik. Dengan swappable 3 pin switch yang nyaman dan kualitas A+. Tampilan desain yang ergonomis, nyaman, dan dilengkapi dengan kaki anti slip. Hadir dengan 16 mode warna RGB backlight, untuk suasana gaming yang menyenangkan.',
    price: '250,000',
    stock: '20',
  },
];

function Products() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div className='card-list-title' id='products-section' style={{ paddingBottom: "50px", paddingTop: "50px" }}>
        <h1>Product List</h1>
      </div>
      <div className='card-list-horizontal'>
        {Array(10).fill(0).map((_, index) => (
          <Card key={index} style={{ width: '18rem', marginRight: '8px' }}>
            <a onClick={toggle} className='card' style={{ textDecoration: "none" }}>
              <CardBody>
                <CardTitle tag="h5">{cardData[0].title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {cardData[0].category}
                </CardSubtitle>
              </CardBody>
              <img alt="card-img" src={cardData[0].imageSrc} width="100%" />
              <CardBody>
                <CardText style={{ textAlign: 'justify', overflow: 'hidden' }}>
                  <p>{cardData[0].description}</p>
                </CardText>
                <CardText style={{ textAlign: 'left' }}>
                  Price: Rp.{cardData[0].price}
                  <br />
                  Stock: {cardData[0].stock} Unit
                </CardText>
               
                <Button  className= "buttonpr" color="primary" onClick={() => handleEditProduct(cardData[0])}>Edit</Button>
                <Button className= "buttonpr" color="danger" onClick={() => handleDeleteProduct(cardData[0].title)}>Delete</Button>
                
              </CardBody>
            </a>
          </Card>
        ))}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>{cardData[0].title}</ModalHeader>
          <ModalBody>
            <div>
              <img src={keyboard} alt="product-img" width="100%" />
              <br />
              Product Description:
              <br />
              <p style={{ textAlign: "justify" }}>{cardData[0].description}</p>
              Price: Rp.{cardData[0].price}
              <br />
              Stock: {cardData[0].stock} Unit
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

// Fungsi untuk menangani Edit produk
function handleEditProduct(product) {
  // Tambahkan logika untuk mengedit produk di sini
  console.log('Edit product:', product);
}

// Fungsi untuk menangani Hapus produk
function handleDeleteProduct(productTitle) {
  // Tambahkan logika untuk menghapus produk di sini
  console.log('Delete product:', productTitle);
}

export default Products;
