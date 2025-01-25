import React, { useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TodoDialog from '@/components/DialogBoxes/TodoDialog';
import useGetTodos from '@/hooks/useGetTodos';
import { useAppSelector } from '@/hooks/redux-hooks';
import Todos from '@/components/TodoCards/Todos';
import { cardBgColorGenerator } from '@/utils/cardBgColorGenerator';
import noTodoPic from '@/assets/images/no todo pic.png';
import { Todos as TodoInterface } from '@/utils/AppInterfaces';

const Dashboard: React.FC = () => {
    const [isTodoDialogOpen, setIsTodoDialogOpen] = useState<boolean>(false);
    const todos = useAppSelector((state) => state.todo.todos);
    useGetTodos();
    const today = new Date();

    const matchingDates = todos.filter(date => {
        let givenDate = new Date(date.completion_date);

        let givenYear = givenDate.getFullYear();
        let givenMonth = givenDate.getMonth();
        let givenDay = givenDate.getDate();

        return (
            givenYear === today.getFullYear() && givenMonth === today.getMonth() && givenDay === today.getDate()
        )
    });

    const completedTasks = todos.filter(todo => todo.task_status == true);

    const handleAddTaskBtn = () => {
        setIsTodoDialogOpen(true);
    }

    const handleTodoClick = (todo: TodoInterface) => {
        console.log(todo);
    }

    const handleCompletedTodoClick = () => {

    }

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-4'>
                    <h1 className='font-noto text-4xl font-medium text-start text-gray-900 dark:text-gray-200 max-[425px]:text-3xl'>What do you need to get done today?</h1>
                    <Button onClick={handleAddTaskBtn} size='lg' className='w-32 h-10 text-base font-noto font-medium'><Plus /> Add Task</Button>
                    <h2 className='font-noto text-3xl font-normal text-start mt-4 text-gray-900 dark:text-gray-200 max-[425px]:text-2xl'>Today's Tasks</h2>
                    <div className='w-full py-5 px-1 flex flex-wrap gap-5 items-center max-[950px]:justify-center'>
                        {matchingDates.length > 0 ? (
                            matchingDates.map((todo, index) => {
                                const color = cardBgColorGenerator();
                                return (
                                    <Todos
                                        key={index}
                                        task={todo.task}
                                        priority={todo.priority}
                                        completion_date={todo.completion_date}
                                        color={color}
                                        onclick={() => handleTodoClick(todo)}
                                    />
                                )
                            })
                        ) : (
                            <div className='w-full flex flex-col items-center justify-center'>
                                <img src={noTodoPic} className='size-36' alt="No Todo" />
                                <p className='text-base text-center font-noto'>No Todos Found</p>
                            </div>
                        )}
                    </div>
                    <h2 className='font-noto text-3xl font-normal text-start mt-4 text-gray-900 dark:text-gray-200 max-[425px]:text-2xl'>Completed Tasks</h2>
                    <div className='w-full py-5 px-1 flex flex-wrap gap-5 items-center max-[950px]:justify-center'>
                        {completedTasks.length > 0 ? (
                            completedTasks.map((todo, index) => {
                                return (
                                    <Todos
                                        key={index}
                                        task={todo.task}
                                        priority={todo.priority}
                                        completion_date={todo.completion_date}
                                        color={"bg-slate-200"}
                                        onclick={() => handleCompletedTodoClick()}
                                    />
                                )
                            })
                        ) : (
                            <div className='w-full flex flex-col items-center justify-center'>
                                <img src={noTodoPic} className='size-36' alt="No Todo" />
                                <p className='text-base text-center font-noto'>No Todos Found</p>
                            </div>
                        )}
                    </div>
                </div>
                <TodoDialog isDialogOpen={isTodoDialogOpen} setIsDialogOpen={setIsTodoDialogOpen} />
            </div>
        </>
    )
}

export default Dashboard;