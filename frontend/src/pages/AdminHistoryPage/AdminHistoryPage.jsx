import {React, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Helmet } from "react-helmet"
import './AdminHistoryPage.css'
import TableHistory from '../../Components/TableHistory/TableHistory';
import NavbarHistory from '../../Components/NavbarHistory/NavbarHistory';

function AdminHistoryPage() {
    useEffect(() => {
        document.body.classList.add('bg-admin');
    }, []);
    
    return(
        <>
            <Helmet>
                <title>Galaxy Comp | Admin</title>
            </Helmet>
            <div className="navbarpr"><NavbarHistory/></div>
            <Sidebar/>
            <div className="productsMain">
                <TableHistory/>
            </div>
        </>
    )
}

export default AdminHistoryPage