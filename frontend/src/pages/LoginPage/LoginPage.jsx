import Login from "../../Components/Login/Login"
import {Helmet} from 'react-helmet'

function LoginPage(){
    return(
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Login/>
        </>
    )
}

export default LoginPage