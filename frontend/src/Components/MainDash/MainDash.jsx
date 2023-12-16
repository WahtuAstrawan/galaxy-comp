import React from 'react'
import './MainDash.css'
import Cards from '../Cards/Cards.jsx'


const MainDash = () => {
  return (
    <div className="MainDash">
        <h1>Dashboard</h1>
        <div className='cards-main'><Cards/></div>
    </div> 
  )
}

export default MainDash;