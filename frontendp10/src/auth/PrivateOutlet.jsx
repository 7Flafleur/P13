// In PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateOutlet = ({ children, ...rest }) => {
    const isAuthenticated = useSelector(state => state.userAuth.token);

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}