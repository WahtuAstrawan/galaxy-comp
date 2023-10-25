import React, { useEffect } from 'react'
import './Login.css'
import * as Unicons from '@iconscout/react-unicons';

function Login() {
    useEffect(() =>{
        document.body.classList.add('bg-login');
    }, []);

  return (
    <div className='container'>
        <div className="header">
            <div className="text-title">Galaxy Comp</div>
            <div className="text">Login Page</div>
            <div className="underline"></div>
        </div>
        <form action="" method="post">
            <div className="inputs">
                <div className="input">
                    <Unicons.UilUserCircle size="30" color="#797979" style={{ margin: "0px 20px" }} />
                    <input type="text" placeholder='Username'/>
                </div>
                <div className="input">
                    <Unicons.UilKeySkeletonAlt size="30" color="#797979" style={{ margin: "0px 20px" }} />
                    <input type="password" placeholder='Password'/>
                </div>
            </div>
            <div className="noacc">Call admin when there is a problem with account</div>
            <div className="submit-container">
                <button type="submit" className="submit-btn">
                    Sign In
                </button>
            </div>
        </form>
    </div>
  )
}

export default Login