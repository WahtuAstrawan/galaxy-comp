import {React, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Helmet } from "react-helmet"
import './AdminTransPage.css'
import NavTrans from '../../Components/NavTrans/NavTrans';
import TableProductTrans from '../../Components/TableProductTrans/TableProductTrans';
import Cart from '../../Components/Cart/Cart';



function AdminTransPage() {
    useEffect(() => {
        document.body.classList.add('bg-admin');
    }, []);
    
    return(
        <>
            <Helmet>
                <title>Galaxy Comp | Admin</title>
            </Helmet>
            <Sidebar/>
            <div className="list"><TableProductTrans/></div>
        </>
    )
}

export default AdminTransPage