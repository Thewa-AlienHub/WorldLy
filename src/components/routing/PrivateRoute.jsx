// src/components/routing/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;