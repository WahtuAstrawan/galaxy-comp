import {React, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import ProductCards from '../../Components/ProductCards/ProductCards';
import { Helmet } from "react-helmet"
import './AdminProductPage.css'
import TableProduct2 from '../../Components/TableProduct2/TableProduct2';
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
                <TableProduct2/>
            </div>
        </>
    )
}

export default AdminProductPage