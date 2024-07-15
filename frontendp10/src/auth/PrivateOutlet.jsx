
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateOutlet = () => {
    const user = useSelector(state => state.userAuth.user);
    const rememberMe = useSelector(state=>state.userAuth.rememberMe)

    const localToken =  localStorage.getItem('token')

    const token = localToken? localToken : useSelector(state => state.userAuth.token);
    // const isAuthenticated = !!user && !!token;


    return token ? <Outlet /> : <Navigate to="/" />
}