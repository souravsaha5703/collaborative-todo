import React, { useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TodoDialog from '@/components/DialogBoxes/TodoDialog';

const Dashboard: React.FC = () => {
    const [isTodoDialogOpen, setIsTodoDialogOpen] = useState<boolean>(false);

    const handleAddTaskBtn = () =>{
        setIsTodoDialogOpen(true);
    }

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-4'>
                    <h1 className='font-noto text-4xl font-medium text-start text-gray-900 dark:text-gray-200'>What do you need to get done today?</h1>
                    <Button onClick={handleAddTaskBtn} size='lg' className='w-32 h-10 text-base font-noto font-medium'><Plus /> Add Task</Button>
                </div>
                <TodoDialog isDialogOpen={isTodoDialogOpen} setIsDialogOpen={setIsTodoDialogOpen}/>
            </div>
        </>
    )
}

export default Dashboard;