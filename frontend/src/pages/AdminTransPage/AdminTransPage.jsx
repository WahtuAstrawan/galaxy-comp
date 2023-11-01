import {React, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Helmet } from "react-helmet"
import './AdminTransPage.css'
import Transaction from '../../Components/Transaction/Transaction';
import NavTrans from '../../Components/NavTrans/NavTrans';
import Products from '../../Components/Products/Products';
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
            <div className="list"><Products/></div>
            <div className="cartp"><Cart/></div>
            
            <div className="transMain">
                <Transaction/>
            </div>
        </>
    )
}

export default AdminTransPage