import {Link} from "react-router-dom"
const LogoutPage = ()=>{
    return(
        <>
            <h1>Welcome logout page</h1>
            <Link to="/login">Loginpage</Link>
        </>
    )
}
export default LogoutPage;