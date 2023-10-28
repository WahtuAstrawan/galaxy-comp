import NavbarLandingPage from "../../Components/Navbar/Navbar"
import About from "../../Components/About/About"
import ProductCards from "../../Components/ProductCards/ProductCards"
import Footer from "../../Components/Footer/Footer"

function LandingPage(){
    return(
        <>
            <NavbarLandingPage/>
            <About/>
            <ProductCards/>
        </>
    )
}

export default LandingPage