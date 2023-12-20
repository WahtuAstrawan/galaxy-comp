import {React, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Helmet } from "react-helmet"
import './AdminAccountPage.css'
import TableAccount from '../../Components/TableAccount/TableAccount';

function AdminAccountPage() {
    useEffect(() => {
        document.body.classList.add('bg-admin');
    }, []);
    
    return(
        <>
            <Helmet>
                <title>Galaxy Comp | Admin</title>
            </Helmet>
            <Sidebar/>
            <div className="accMain">
                <TableAccount/>
            </div>
        </>
    )
}

export default AdminAccountPage