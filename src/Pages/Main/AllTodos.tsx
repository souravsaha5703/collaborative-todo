import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import useGetTodos from '@/hooks/useGetTodos';
import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import TodoUpdateDialog from '@/components/DialogBoxes/TodoUpdateDialog';
import Todos from '@/components/TodoCards/Todos';
import { cardBgColorGenerator } from '@/utils/cardBgColorGenerator';
import noTodoPic from '@/assets/images/no todo pic.png';
import { Todos as TodoInterface } from '@/utils/AppInterfaces';
import Loader from '@/components/Loaders/Loader';
import { database } from '@/Appwrite/appwriteConfig';
import { updateTodoStatus } from '@/features/Todo/todoSlice';
import TodoCardDialog from '@/components/DialogBoxes/TodoCardDialog';

interface CardDialogInterface {
    task: string,
    color: string
}

const AllTodos: React.FC = () => {
    const [isTodoDialogOpen, setIsTodoDialogOpen] = useState<boolean>(false);
    const [isTodoCardDialogOpen, setIsTodoCardDialogOpen] = useState<boolean>(false);
    const [dialogData, setDialogData] = useState<TodoInterface>({
        id: '',
        task: '',
        task_status: false,
        completion_date: '',
        priority: '',
        createdBy: '',
        tags: []
    });
    const [cardDialogData, setCardDialogData] = useState<CardDialogInterface>({
        task: '',
        color: ''
    });
    const [loading, setLoading] = useState<boolean>(true);
    useGetTodos();
    const todos = useAppSelector((state) => state.todo.todos);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, []);

    const filteredTodos: TodoInterface[] = todos.filter(todo => todo.task_status !== true);

    const upcomingTodos: TodoInterface[] = filteredTodos.filter(todo => {
        let taskDate: Date = new Date(todo.completion_date);
        let today: Date = new Date();

        today.setHours(0, 0, 0, 0);

        if (taskDate >= today) {
            return todo
        }
    })

    const incompleteTodos: TodoInterface[] = filteredTodos.filter(todo => {
        let taskDate: Date = new Date(todo.completion_date);
        let today: Date = new Date();

        today.setHours(0, 0, 0, 0);

        if (taskDate < today) {
            return todo
        }
    });

    const completedTasks: TodoInterface[] = todos.filter(todo => todo.task_status == true);

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
        setIsTodoDialogOpen(true);
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

    const handleTodoCardClick = (task: string, color: string) => {
        setCardDialogData({
            task: task,
            color: color
        });
        setIsTodoCardDialogOpen(true);
    }

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-4'>
                    <h1 className='font-noto text-4xl font-medium text-start text-gray-900 dark:text-gray-200 max-[425px]:text-3xl'>All Upcoming Tasks</h1>
                    {loading ? (
                        <div className='w-full py-5 px-1 flex items-center justify-center'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='w-full py-5 px-1 flex flex-wrap gap-5 items-center max-[950px]:justify-center'>
                            {upcomingTodos.length > 0 ? (
                                upcomingTodos.map((todo, index) => {
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
                                            onCardClick={() => handleTodoCardClick(todo.task, color)}
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
                    <h2 className='font-noto text-3xl font-normal text-start mt-4 text-gray-900 dark:text-gray-200 max-[425px]:text-2xl'>All Incomplete Tasks</h2>
                    {loading ? (
                        <div className='w-full py-5 px-1 flex items-center justify-center'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='w-full py-5 px-1 flex flex-wrap gap-5 items-center max-[950px]:justify-center'>
                            {incompleteTodos.length > 0 ? (
                                incompleteTodos.map((todo, index) => {
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
                                            onCardClick={() => handleTodoCardClick(todo.task, color)}
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
                    <h2 className='font-noto text-3xl font-normal text-start mt-4 text-gray-900 dark:text-gray-200 max-[425px]:text-2xl'>All Completed Tasks</h2>
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
                                            taskCompletedDate={todo.task_completed_date}
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
                <TodoUpdateDialog isDialogOpen={isTodoDialogOpen} setIsDialogOpen={setIsTodoDialogOpen} id={dialogData.id} selectedTask={dialogData.task} completion_date={dialogData.completion_date} priority={dialogData.priority} selectedTags={dialogData.tags} createdBy={dialogData.createdBy} />
                <TodoCardDialog isDialogOpen={isTodoCardDialogOpen} setIsDialogOpen={setIsTodoCardDialogOpen} task={cardDialogData.task} color={cardDialogData.color} />
            </div>
        </>
    )
}

export default AllTodos;