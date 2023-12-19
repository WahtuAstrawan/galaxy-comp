import React from 'react';
import './Cards.css';
import { CardsData } from '../../Data/Data';

const Cards = () => {
  const card1 = CardsData[0];
  const card2 = CardsData[1];

  return (
    <div className="Cards">
      <div className="parentcontainer">
        <div className="statistic-card">
          <h5>Pendapatan Kotor Bulan Ini</h5>
          <p className='p-text-cards'>{card1.value1}</p>
        </div>
      </div>
      <div className="parentcontainer">
        <div className="statistic-card">
          <h5>Pendapatan Bersih Bulan Ini</h5>
          <p className='p-text-cards'>{card2.value1}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
