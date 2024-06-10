import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from '../../utils/constants'

const Layout = () => {
    const { currentUser } = useContext(AuthContext)
    if (!currentUser) {
        return <Navigate to={PATHS.LOGIN} />
    }
    return (
        < Outlet />
    )
}

export default Layout