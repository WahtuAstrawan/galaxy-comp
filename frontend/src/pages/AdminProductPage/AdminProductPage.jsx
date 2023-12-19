import {React, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import ProductCards from '../../Components/ProductCards/ProductCards';
import { Helmet } from "react-helmet"
import './AdminProductPage.css'
import TableProduct3 from '../../Components/TableProduct3/TableProduct3';
import NavbarProduct from '../../Components/NavbarProduct/NavbarProduct';

function AdminProductPage() {
    useEffect(() => {
        document.body.classList.add('bg-admin');
    }, []);
    
    return(
        <>
            <Helmet>
                <title>Galaxy Comp | Admin</title>
            </Helmet>
            <div className="navbarpr"><NavbarProduct/></div>
            <Sidebar/>
            <div className="productsMain">
                <TableProduct3/>
            </div>
        </>
    )
}

export default AdminProductPage