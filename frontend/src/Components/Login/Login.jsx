import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import * as Unicons from '@iconscout/react-unicons';
import useAuth from '../../hooks/useAuth.js';

function Login() {
    useEffect(() =>{
        document.body.classList.add('bg-login');
    }, []);

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitForm = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:8080/login', { username, password });

            if(response.data.success){
                localStorage.setItem('token', response.data.token);
                alert(response.data.message);
                navigate(from, {replace: true});
            }else{
                alert(response.data.message);
            }
    
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
        <form onSubmit={onSubmitForm}>
            <div className="inputs">
                <div className="input">
                    <Unicons.UilUserCircle size="30" color="#797979" style={{ margin: "0px 20px" }} />
                    <input type="text" placeholder='Username' name='username' onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input">
                    <Unicons.UilKeySkeletonAlt size="30" color="#797979" style={{ margin: "0px 20px" }} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="noacc">Call admin when there is a problem with account</div>
            <div className="submit-container">
                <button className="submit-btn" type='submit'>
                    Sign In
                </button>
            </div>
        </form>
    </div>
  )
}

export default Login