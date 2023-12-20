import React, { useEffect } from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import './ProductCards.css'
import keyboard from './gamen.png'
import { useState } from 'react'
import axios from 'axios';

function ProductCards() {
  const [modal, setModal] = useState(false);
  const [trendProducts, setTrendProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggle = () => setModal(!modal);

  const getTrend = async () => {
    try {
      const res = await axios.get("http://localhost:8080/dashboard/trend");
      setTrendProducts(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrend();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModal(true);
  };

  return (
    <>
      <div className='card-list-title' id='products-section' style={{ paddingBottom: "50px", paddingTop: "50px" }}>
        <h1>Best-Selling Products</h1>
      </div>
      <div className='card-list-horizontal'>
        {trendProducts.map((product, index) => (
          <Card key={index} style={{ width: '18rem', marginRight: '8px' }}>
            <CardBody>
              <CardTitle tag="h5">{product.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {product.category}
              </CardSubtitle>
            </CardBody>
            <a onClick={() => openModal(product)} style={{ textDecoration: "none", alignContent: "center", margin: "0" }}>
              <img alt="card-img" src={product.productImg} width="100%" />
            </a>
            <CardBody>
              <CardText style={{ textAlign: 'justify', overflow: 'hidden' }}>
                <p>{product.description}</p>
              </CardText>
              <CardText style={{ textAlign: 'left' }}>
                Price : Rp.{product.sellPrice}
                <br />
                Stock : {product.stock} Unit
              </CardText>
            </CardBody>
          </Card>
        ))}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>{selectedProduct ? selectedProduct.name : ''}</ModalHeader>
          <ModalBody>
            <div>
              {selectedProduct && (
                <>
                  <img src={selectedProduct.productImg} alt="product-img" width="100%" />
                  <br />
                  Product Description :
                  <br />
                  <p style={{ textAlign: "justify" }}>{selectedProduct.desc}</p>
                  Price : Rp.{selectedProduct.sellPrice}
                  <br />
                  Stock : {selectedProduct.stock} Unit
                </>
              )}
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

export default ProductCards