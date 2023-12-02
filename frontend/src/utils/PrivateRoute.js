import React, {useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const PrivateRoute = () => {
    let {user} = useContext(AuthContext)
    
    if(!user){
        return <Navigate to='/login' />
    }
    return <Outlet />
}

export default PrivateRoute
