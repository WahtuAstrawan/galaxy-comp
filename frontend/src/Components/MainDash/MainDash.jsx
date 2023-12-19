import React from 'react'
import './MainDash.css'
import Cards from '../Cards/Cards'
import TableProduct2 from '../TableProduct2/TableProduct2'


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