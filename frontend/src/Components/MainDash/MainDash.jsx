import React from 'react'
import './MainDash.css'
<<<<<<< HEAD
import Cards from '../Cards/Cards.jsx'
=======
import Cards from '../Cards/Cards'
import TableProduct2 from '../TableProduct2/TableProduct2'
>>>>>>> 5d61d14a28b6fa0e0ce70a386e93c243f9084428


const MainDash = () => {
  return (
    <div className="MainDash">
        <h1>Dashboard</h1>
        <div className='cards-main'><Cards/></div>
        <div className='products'><TableProduct2/></div>
    </div> 
  )
}

export default MainDash;