import {React, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Helmet } from "react-helmet"
import './AdminHistoryPage.css'
import TableHistory from '../../Components/TableHistory/TableHistory';



function AdminHistoryPage() {
    useEffect(() => {
        document.body.classList.add('bg-admin');
    }, []);
    
    return(
        <>
            <Helmet>
                <title>Galaxy Comp | Admin</title>
            </Helmet>
            <Sidebar/>
            <div className="productsMain">
                <TableHistory/>
            </div>
        </>
    )
}

export default AdminHistoryPage