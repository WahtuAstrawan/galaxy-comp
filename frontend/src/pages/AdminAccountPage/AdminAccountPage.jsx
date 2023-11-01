import {React, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Helmet } from "react-helmet"
import './AdminAccountPage.css'
import TableProduct2 from '../../Components/TableAccount/TableAccount';
import NavbarAccount from '../../Components/NavbarAccount/NavbarAccount';

function AdminAccountPage() {
    useEffect(() => {
        document.body.classList.add('bg-admin');
    }, []);
    
    return(
        <>
            <Helmet>
                <title>Galaxy Comp | Admin</title>
            </Helmet>
            <div className="navbarpr"><NavbarAccount/></div>
            <Sidebar/>
            <div className="productsMain">
                <TableProduct2/>
            </div>
        </>
    )
}

export default AdminAccountPage