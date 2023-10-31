import { useEffect } from "react"
import Sidebar from "../../Components/Sidebar/Sidebar"
import MainDash from "../../Components/MainDash/MainDash"
import Products from "../../Components/Products/Products"
import { Helmet } from "react-helmet"

import './AdminPage.css'


function AdminPage(){
    useEffect(() => {
        document.body.classList.add('bg-admin');
    }, []);
    
    return(
        <>
            <Helmet>
                <title>Galaxy Comp | Admin</title>
            </Helmet>
            <Sidebar/>
            <MainDash/>
        </>
    )
}

export default AdminPage