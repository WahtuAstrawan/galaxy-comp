import Login from "../../Components/Login/Login"
import {Helmet} from 'react-helmet'

function LoginPage(){
    return(
        <>
            <Helmet>
                <title>Galaxy Comp | Login</title>
            </Helmet>
            <Login/>
        </>
    )
}

export default LoginPage