import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './hooks/redux-hooks';

const ProtectedRoutes: React.FC = () => {
    const userStatus = useAppSelector((state) => state.user.status);

    if (userStatus === false) {
        return <Navigate to={'/login'} replace />
    } else {
        return <Outlet />
    }
}

export default ProtectedRoutes;