import React from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';

const TeamMembers: React.FC = () => {
    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-4'>
                    <h1 className="text-3xl font-bold tracking-tight">UI UX Members</h1>
                    <p className="text-muted-foreground">Manage your team members and their roles.</p>
                </div>
            </div>
        </>
    )
}

export default TeamMembers;