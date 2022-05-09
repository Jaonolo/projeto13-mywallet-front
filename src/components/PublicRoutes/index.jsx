import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

import UserContext from "../../contexts/UserContext"

const PublicRoutes = () => {
    const { user } = useContext(UserContext)

    if(user !== null)
        return <Navigate to='/'/>

    return <Outlet/>
}

export default PublicRoutes