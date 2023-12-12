import React, { useEffect, useState } from 'react';
import './Cards.css';
import { CardsData } from '../../Data/Data';

const Cards = () => {
  const [products, setProducts] = useState([{}]);
  useEffect(() => {
    fetch("http/local/product/", "GET")
  }, [])

  const card1 = CardsData[0]; // Ambil data pertama dari CardsData
  const card2 = CardsData[1]; // Ambil data kedua dari CardsData
  const card3 = CardsData[2]; // Ambil data ketiga dari CardsData

  return (
    <div className="Cards">
      <div className="parentcontainer">
        {products.map(product)}
        <div className="statistic-card">

          <h2>{product.name}</h2>
          <p className='p-text-cards'>{products.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
