import React from 'react';
import './Cards.css';
import { CardsData } from '../../Data/Data';

const Cards = () => {
  const card1 = CardsData[0]; // Ambil data pertama dari CardsData
  const card2 = CardsData[1]; // Ambil data kedua dari CardsData
  const card3 = CardsData[2]; // Ambil data ketiga dari CardsData

  return (
    <div className="Cards">
      <div className="parentcontainer">
        <div className="statistic-card">
          <h2>{card1.title1}</h2>
          <p>{card1.value1}</p>
        </div>
      </div>
      <div className="parentcontainer">
        <div className="statistic-card">
          <h2>{card2.title1}</h2>
          <p>{card2.value1}</p>
        </div>
      </div>
      <div className="parentcard"> {/* Card 3 di sini */}
        <div className="statistic-card">
          <h2>{card3.title1}</h2>
          <p>{card3.value1}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
