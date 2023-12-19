import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Login.css';
import * as Unicons from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';

function Login() {
    useEffect(() =>{
        document.body.classList.add('bg-login');
        localStorage.clear();
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', { username, password });

            if(response.data.success){
                localStorage.setItem('token', response.data.token);
                const res = await axios.get('http://localhost:8080/login/role', {headers: {'auth' : response.data.token}});
                const role = res.data.role === 'admin' ? '7134' : '4169';
                localStorage.setItem('role', role);
                navigate("/admin", {replace: true});
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