import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'; // Import Button component from 'reactstrap'
import TableProductTrans from '../../Components/TableProductTrans/TableProductTrans';
import './Cart.css';

function Cart() {
  const [modal, setModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const toggle = () => setModal(!modal);
  const handleAddToCart = (product) => {
    // Add the selected product to the cartItems state
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const [price, setPrice] = useState('');
  const [stored, setStored] = useState('');
  const [changes, setChanges] = useState('');

  // Fungsi ini akan dipanggil saat tombol "Finish" ditekan
  const handleFinish = () => {
    // Menghitung perubahan dari pengurangan price dan stored
    const priceValue = parseFloat(price);
    const storedValue = parseFloat(stored);
    const changesValue = priceValue - storedValue;
    setChanges(changesValue);
  };

  return (
    <>
      <div>
        <div className="carttitle">
          <h1>Cart</h1>
        </div>
       

        <div className='card-list-horizontal'>
          {/* Render the selected products in the Cart */}
          {cartItems.map((item, index) => (
            <Card key={index} style={{ width: '20rem', marginRight: '8px', marginTop: '-0.1rem' }}>
              <CardBody>
                <CardTitle tag="h5">{item.name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{item.category}</CardSubtitle>
                <CardText>Rp.{item.price}</CardText>
                {/* Add more details if needed */}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div className="contenttrans">
  <div className="transaction-form">
    {/* <div className="transaction-input">
      <input
        type="text"
        placeholder="Price"
        value={price}
        readOnly
      />
    </div>
    <div className="transaction-input">
      <input
        type="text"
        placeholder="Stored"
        value={stored}
        readOnly
      />
    </div> */}
    <div className="transaction-input">
          <input
            type="text"
            placeholder="Price"
            value={price}
            readOnly
          />
        </div>
        <div className="transaction-input">
          <input
            type="text"
            placeholder="Stored"
            value={stored}
            readOnly
          />
        </div>
    <div className="transaction-input">
      <input
        type="text"
        placeholder="Changes"
        value={changes}
        readOnly
      />
    </div>
    
    <div className="transaction-input">
    <Button color="success" onClick={handleFinish}>Finish</Button>
    </div>
  </div>
</div>


    </>
  );
  

 
}

export default Cart;
