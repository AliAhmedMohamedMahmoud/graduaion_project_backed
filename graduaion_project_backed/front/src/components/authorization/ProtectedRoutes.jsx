import React from 'react'
import { Outlet } from 'react-router-dom'
import { user } from '../../common/baseUrl'
import Login from '../LoginAndRegister/Login'

export default function ProtectedRoutes() {
    return user ? <Outlet /> : <Login />
}
