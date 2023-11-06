import {React, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Helmet } from "react-helmet"
import './AdminProfilePage.css'
import Profile from '../../Components/Profile/Profile';



function AdminProfilePage() {
    useEffect(() => {
        document.body.classList.add('bg-admin');
    }, []);
    
    return(
        <>
            <Helmet>
                <title>Galaxy Comp | Admin</title>
            </Helmet>
            <Sidebar/>
            <div className="profileMain">
                <Profile/>
            </div>
        </>
    )
}

export default AdminProfilePage