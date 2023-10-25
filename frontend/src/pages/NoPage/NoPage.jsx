import React from 'react'
import { useEffect } from 'react'

import './NoPage.css'

function NoPage() {
    useEffect(() =>{
        document.body.classList.add('bg-nopage');
    }, []);

  return (
    <div className='message'>
        <h1 style={{ color:"white", }}>Error 404 : Page Not Found</h1>
    </div>
  )
}

export default NoPage