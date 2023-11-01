import React, { useState } from 'react';
import './Transaction.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Transaction() {
  const [price, setPrice] = useState('');
  const [stored, setStored] = useState('');
  const [promo, setPromo] = useState('Promotion 1');
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
  );
}

export default Transaction;
