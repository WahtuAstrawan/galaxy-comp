import {React, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Helmet } from "react-helmet"
import './AdminTransPage.css'
import Transaction from '../../Components/Transaction/Transaction';
import NavTrans from '../../Components/NavTrans/NavTrans';
import TableProductTrans from '../../Components/TableProductTrans/TableProductTrans';
import Cart from '../../Components/Cart/Cart';



function AdminTransPage() {
    useEffect(() => {
        document.body.classList.add('bg-admin1');
    }, []);
    
    return(
        <>
            <Helmet>
                <title>Galaxy Comp | Admin</title>
            </Helmet>
            <div className="navtr"><NavTrans/></div>
            <Sidebar/>
            <div className="list"><TableProductTrans/></div>
            <div className="cartp"><Cart/></div>
            
           
        </>
    )
}

export default AdminTransPage