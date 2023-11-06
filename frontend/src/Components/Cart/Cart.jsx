import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import './Cart.css';

function Cart() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
    <div><div className="carttitle"><h1>Cart</h1></div>
    <div className='cart-container' style={{ background: '#f8f8f8', padding: '200px' }}></div>
    
      <div className='card-list-horizontal'>
        {Array(10).fill(0).map((_, index) => (
          <Card key={index} style={{ width: '20rem', marginRight: '8px', marginTop: '-0.1rem' }}>
            <a onClick={toggle} className='card' style={{ textDecoration: "none" }}>
              
            </a>
          </Card>
        ))}
      </div>
    </div>
    </>
  );
}

export default Cart;
