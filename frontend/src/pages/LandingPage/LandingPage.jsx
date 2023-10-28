import NavbarLandingPage from "../../Components/Navbar/Navbar"
import About from "../../Components/About/About"
import ProductCards from "../../Components/ProductCards/ProductCards"
import TableProduct from "../../Components/TableProduct/TableProduct"
import Footer from "../../Components/Footer/Footer"
import './LandingPage.css'

function LandingPage(){
    return(
        <>
            <div className="page-container">
                <div className="wrapper">
                    <NavbarLandingPage/>
                    <About/>
                    <ProductCards/>
                    <TableProduct/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default LandingPage