import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cards.css';

const Cards = () => {
  const [netIncome, setNetIncome] = useState(0);
  const [income, setIncome] = useState(0);

  const getIncome = async () => {
    const res = await axios.get("http://localhost:8080/dashboard/income", {headers: {'auth': localStorage.getItem('token')}});
    setIncome(res.data.data.totalGrosIncome);
    setNetIncome(res.data.data.totalNetIncome);
  }

  useEffect(() => {
    getIncome();
  }, [])

  return (
    <div className="Cards">
      <div className="parentcontainer">
        <div className="statistic-card">
          <h5>Bruto Income This Month</h5>
          <p className='p-text-cards'>Rp.{income}</p>
        </div>
      </div>
      <div className="parentcontainer">
        <div className="statistic-card">
          <h5>Netto Income This Month</h5>
          <p className='p-text-cards'>Rp.{netIncome}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;