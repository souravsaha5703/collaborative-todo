import React from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { useAppSelector } from '../../hooks/redux-hooks';
import Navbar from '@/components/NavigationBars/Navbar';

const Dashboard: React.FC = () => {
    const user = useAppSelector((state) => state.user.currentUser);
    return (
        <>
            <Navbar/>
            <Sidebar/>
            <div>{user?.fullname}</div>
        </>
    )
}

export default Dashboard;