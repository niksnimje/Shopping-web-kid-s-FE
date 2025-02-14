import { Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';

const Privateroutes=({children})=> {
    const [cookies] = useCookies(['_vercel_jwt']);
    const isAuth=(cookies._vercel_jwt) 
    if(!isAuth){
        return  <Navigate to="/"/>
    }
    return  children

}

export default Privateroutes