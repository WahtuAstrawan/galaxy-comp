import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Login.css';
import * as Unicons from '@iconscout/react-unicons';

function Login() {
    useEffect(() =>{
        document.body.classList.add('bg-login');
    }, []);

    const [formData, setFormData] = useState({username: '', password: ''});

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/login');
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='container-login'>
        <div className="header">
            <div className="text-title">Galaxy Comp</div>
            <div className="text">Login Page</div>
            <div className="underline"></div>
        </div>
        <form onSubmit={onSubmit}>
            <div className="inputs">
                <div className="input">
                    <Unicons.UilUserCircle size="30" color="#797979" style={{ margin: "0px 20px" }} />
                    <input type="text" placeholder='Username' name='username' onChange={(e) => setFormData({...formData, username: e.target.value})}/>
                </div>
                <div className="input">
                    <Unicons.UilKeySkeletonAlt size="30" color="#797979" style={{ margin: "0px 20px" }} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                </div>
            </div>
            <div className="noacc">Call admin when there is a problem with account</div>
            <div className="submit-container">
                <button className="submit-btn">
                    Sign In
                </button>
            </div>
        </form>
    </div>
  )
}

export default Login