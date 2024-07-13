
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateOutlet = ({ children}) => {
    const user = useSelector(state => state.userAuth.user);
    const token = useSelector(state => state.userAuth.token);
    // const isAuthenticated = !!user && !!token;


    return token ? <Outlet /> : <Navigate to="/" />
}