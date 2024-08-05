import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RoleBasedRoute({ children, role }) {
    const userRole = localStorage.getItem('role');
    console.log(userRole)

    return userRole === role
        ? children
        : <Navigate to="/not-authorized" />;
}