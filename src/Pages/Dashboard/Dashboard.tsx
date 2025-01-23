import React, { useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TodoDialog from '@/components/DialogBoxes/TodoDialog';
import useGetTodos from '@/hooks/useGetTodos';
import { useAppSelector } from '@/hooks/redux-hooks';
import Todos from '@/components/TodoCards/Todos';

const Dashboard: React.FC = () => {
    const [isTodoDialogOpen, setIsTodoDialogOpen] = useState<boolean>(false);
    const todos = useAppSelector((state) => state.todo.todos);
    useGetTodos();

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
                    <h2 className='font-noto text-3xl font-normal text-start mt-4 text-gray-900 dark:text-gray-200'>Today's Tasks</h2>
                    <div className='w-full py-5 px-1 flex flex-wrap gap-5'>
                        {todos.map((todo,index) => {
                            return (
                                <Todos 
                                key={index}
                                task={todo.task}
                                priority={todo.priority}
                                completion_date={todo.completion_date}
                                />
                            )
                        })}
                    </div>
                </div>
                <TodoDialog isDialogOpen={isTodoDialogOpen} setIsDialogOpen={setIsTodoDialogOpen}/>
            </div>
        </>
    )
}

export default Dashboard;