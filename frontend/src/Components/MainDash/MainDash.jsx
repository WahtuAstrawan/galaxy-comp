import React from 'react'
import './MainDash.css'
import Cards from '../Cards/Cards'

const MainDash = () => {
  return (
    <div className="MainDash">
        <h1>Dashboard</h1>
        <div className='cards'><Cards/></div>
    </div> 
  )
}

export default MainDash