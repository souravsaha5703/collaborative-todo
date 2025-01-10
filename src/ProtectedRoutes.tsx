import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './hooks/redux-hooks';

const ProtectedRoutes: React.FC = () => {
    const user = useAppSelector((state) => state.user.currentUser);

    if (user === null) {
        return <Navigate to={'/login'} replace />
    } else {
        return <Outlet />
    }
}

export default ProtectedRoutes;