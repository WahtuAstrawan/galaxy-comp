import React from 'react'
import './MainDash.css'
import Cards from '../Cards/Cards'
import Products from '../Products/Products'


const MainDash = () => {
  return (
    <div className="MainDash">
        <h1>Dashboard</h1>
        <div className='cards-main'><Cards/></div>
        <div className='products-main'><Products/></div>
    </div> 
  )
}

export default MainDash;