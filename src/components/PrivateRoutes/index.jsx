import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

import UserContext from "../../contexts/UserContext"

const PrivateScreens = () => {
    const { user } = useContext(UserContext)

    if(user === null)
        return <Navigate to='/login'/>

    return <Outlet/>
}

export default PrivateScreens