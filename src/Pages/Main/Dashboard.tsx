import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TodoDialog from '@/components/DialogBoxes/TodoDialog';
import TodoUpdateDialog from '@/components/DialogBoxes/TodoUpdateDialog';
import useGetTodos from '@/hooks/useGetTodos';
import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import Todos from '@/components/TodoCards/Todos';
import { cardBgColorGenerator } from '@/utils/cardBgColorGenerator';
import noTodoPic from '@/assets/images/no todo pic.png';
import { Todos as TodoInterface } from '@/utils/AppInterfaces';
import Loader from '@/components/Loaders/Loader';
import { database } from '@/Appwrite/appwriteConfig';
import { updateTodoStatus } from '@/features/Todo/todoSlice';

const Dashboard: React.FC = () => {
    const [isTodoDialogOpen, setIsTodoDialogOpen] = useState<boolean>(false);
    const [isUpdateTodoDialogOpen, setIsUpdateTodoDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [dialogData, setDialogData] = useState<TodoInterface>({
        id: '',
        task: '',
        task_status: false,
        completion_date: '',
        priority: '',
        createdBy: '',
        tags: []
    });
    const todos = useAppSelector((state) => state.todo.todos);
    useGetTodos();
    const dispatch = useAppDispatch();
    const today = new Date();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, []);

    const matchingDates = todos.filter(date => {
        let givenDate = new Date(date.completion_date);

        let givenYear = givenDate.getFullYear();
        let givenMonth = givenDate.getMonth();
        let givenDay = givenDate.getDate();

        return (
            givenYear === today.getFullYear() && givenMonth === today.getMonth() && givenDay === today.getDate()
        )
    });

    const filteredTodos = matchingDates.filter(todo => todo.task_status !== true);

    const completedTasks = matchingDates.filter(todo => todo.task_status == true);

    const handleAddTaskBtn = () => {
        setIsTodoDialogOpen(true);
    }

    const handleEditTodoClick = (todo: TodoInterface) => {
        setDialogData({
            id: todo.id,
            task: todo.task,
            task_status: todo.task_status,
            completion_date: todo.completion_date,
            priority: todo.priority,
            createdBy: todo.createdBy,
            tags: todo.tags
        });
        setIsUpdateTodoDialogOpen(true);
    }

    const handleCompleteTodoClick = async (id: string) => {
        await database.updateDocument(
            import.meta.env.VITE_APPWRITE_TODO_DB_ID,
            import.meta.env.VITE_APPWRITE_TODOS_COLLECTION_ID,
            id, {
            task_status: true,
            task_completed_date: new Date()
        }
        );
        dispatch(updateTodoStatus(id));
    }

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-4'>
                    <h1 className='font-noto text-4xl font-medium text-start text-gray-900 dark:text-gray-200 max-[425px]:text-3xl'>What do you need to get done today?</h1>
                    <Button onClick={handleAddTaskBtn} size='lg' className='w-32 h-10 text-base font-noto font-medium'><Plus /> Add Task</Button>
                    <h2 className='font-noto text-3xl font-normal text-start mt-4 text-gray-900 dark:text-gray-200 max-[425px]:text-2xl'>Today's Tasks</h2>
                    {loading ? (
                        <div className='w-full py-5 px-1 flex items-center justify-center'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='w-full py-5 px-1 flex flex-wrap gap-5 items-center max-[950px]:justify-center'>
                            {filteredTodos.length > 0 ? (
                                filteredTodos.map((todo, index) => {
                                    const color = cardBgColorGenerator();
                                    return (
                                        <Todos
                                            key={index}
                                            task={todo.task}
                                            priority={todo.priority}
                                            completion_date={todo.completion_date}
                                            color={color}
                                            onEditClick={() => handleEditTodoClick(todo)}
                                            onCompleteClick={() => handleCompleteTodoClick(todo.id)}
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
                    )
                    }

                    <h2 className='font-noto text-3xl font-normal text-start mt-4 text-gray-900 dark:text-gray-200 max-[425px]:text-2xl'>Completed Tasks</h2>
                    {loading ? (
                        <div className='w-full py-5 px-1 flex items-center justify-center'>
                            <Loader />
                        </div>
                    ) : (
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
                    )}
                </div>
                <TodoDialog isDialogOpen={isTodoDialogOpen} setIsDialogOpen={setIsTodoDialogOpen} />
                <TodoUpdateDialog isDialogOpen={isUpdateTodoDialogOpen} setIsDialogOpen={setIsUpdateTodoDialogOpen} id={dialogData.id} selectedTask={dialogData.task} completion_date={dialogData.completion_date} priority={dialogData.priority} selectedTags={dialogData.tags} createdBy={dialogData.createdBy} />
            </div>
        </>
    )
}

export default Dashboard;