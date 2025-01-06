import React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';

const Todos: React.FC = () => {
    const user = useAppSelector((state) => state.user.currentUser);
    return (
        <div>{user?.fullname}</div>
    )
}

export default Todos;