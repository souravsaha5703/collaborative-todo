import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Plus } from 'lucide-react';
import { database } from '@/Appwrite/appwriteConfig';
import { Query } from 'appwrite';
import { useAppSelector } from '@/hooks/redux-hooks';
import CreateTeamTodoDialog from '@/components/DialogBoxes/CreateTeamTodoDialog';
import { List as ListInterface, TeamTodosInterface } from '@/utils/AppInterfaces';
import TeamTodoItems from '@/components/Teams/TeamTodoItems';
import { cardBgColorGenerator } from '@/utils/cardBgColorGenerator';
import useGetTeamTodos from '@/hooks/useGetTeamTodos';
import TeamTodoDetailsDialog from '@/components/DialogBoxes/TeamTodoDetailsDialog';

const TeamTodos: React.FC = () => {
    const [isTodoDialogOpen, setIsTodoDialogOpen] = useState<boolean>(false);
    const [isTodoDetailsDialogOpen, setIsTodoDetailsDialogOpen] = useState<boolean>(false);
    const [todoDetailsDialogData, setTodoDetailsDialogData] = useState<TeamTodosInterface | null>(null);
    const [listData, setListData] = useState<ListInterface | null>(null);
    const { list_id } = useParams();
    useGetTeamTodos(list_id ?? "");
    const teamTodos = useAppSelector((state) => state.teamTodo.teamTodos);

    useEffect(() => {
        const fetchListData = async () => {
            if (list_id) {
                const listData = await database.listDocuments(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_LISTS_COLLECTION_ID,
                    [Query.equal('$id', list_id)]
                );

                setListData(prev => ({
                    ...prev,
                    id: listData.documents[0].$id,
                    list_name: listData.documents[0].list_name,
                    team_id: listData.documents[0].team_id,
                    createdBy: listData.documents[0].createdBy,
                    createdAt: listData.documents[0].$createdAt
                }));
            }
        }

        fetchListData();
    }, [list_id]);

    const pendingTodos: TeamTodosInterface[] = teamTodos.filter(todo => todo.task_status == false);
    const completedTodos: TeamTodosInterface[] = teamTodos.filter(todo => todo.task_status == true);

    const handleAddTaskBtn = () => {
        setIsTodoDialogOpen(true);
    }

    const handleEditTodoClick = () => {

    }

    const handleCompleteTodoClick = async () => {

    }

    const handleTodoCardClick = (id: string) => {
        const selectedTodo: TeamTodosInterface[] = teamTodos.filter(todo => todo.id == id);
        setTodoDetailsDialogData(selectedTodo[0]);
        setIsTodoDetailsDialogOpen(true);
    }

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-4'>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-noto font-bold tracking-tight">{listData?.list_name}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button onClick={handleAddTaskBtn} size='lg' className='w-32 h-10 text-base font-noto font-medium'><Plus /> Add Task</Button>
                        </div>
                    </div>
                    <Tabs defaultValue="all" className="mb-8">
                        <TabsList>
                            <TabsTrigger value="all" className='font-noto'>All Tasks ({teamTodos.length})</TabsTrigger>
                            <TabsTrigger value="pending" className='font-noto'>Pending ({pendingTodos.length})</TabsTrigger>
                            <TabsTrigger value="completed" className='font-noto'>Completed ({completedTodos.length})</TabsTrigger>
                        </TabsList>


                        <TabsContent value="all" className="mt-4">
                            <Card className="p-4">
                                <div className="divide-y">
                                    {teamTodos.length == 0 ? (
                                        <div className="p-6 text-center">
                                            <p className="text-muted-foreground">No tasks found</p>
                                            <Button onClick={handleAddTaskBtn} size='lg' className='w-32 h-10 text-base font-noto font-medium'><Plus /> Add Task</Button>
                                        </div>
                                    ) : (
                                        teamTodos.map((todo, index) => {
                                            const color = cardBgColorGenerator();
                                            return (
                                                <TeamTodoItems
                                                    key={index}
                                                    task={todo.task}
                                                    priority={todo.priority}
                                                    completion_date={todo.task_due_date}
                                                    taskCompletedDate={todo.task_completed_date}
                                                    assignedMemberId={todo.assigned_to.id}
                                                    assignedMemberName={todo.assigned_to.user_name}
                                                    color={color}
                                                    onEditClick={() => handleEditTodoClick()}
                                                    onCompleteClick={() => handleCompleteTodoClick()}
                                                    onCardClick={() => handleTodoCardClick(todo.id)}
                                                />
                                            )
                                        })
                                    )}
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="pending" className="mt-4">
                            <Card className="p-4">
                                <div className="divide-y">
                                    {pendingTodos.length == 0 ? (
                                        <div className="p-6 text-center">
                                            <p className="text-muted-foreground font-noto">No pending tasks</p>
                                        </div>
                                    ) : (
                                        pendingTodos.map((todo, index) => {
                                            const color = cardBgColorGenerator();
                                            return (
                                                <TeamTodoItems
                                                    key={index}
                                                    task={todo.task}
                                                    priority={todo.priority}
                                                    completion_date={todo.task_due_date}
                                                    assignedMemberId={todo.assigned_to.id}
                                                    assignedMemberName={todo.assigned_to.user_name}
                                                    color={color}
                                                    onEditClick={() => handleEditTodoClick()}
                                                    onCompleteClick={() => handleCompleteTodoClick()}
                                                    onCardClick={() => handleTodoCardClick(todo.id)}
                                                />
                                            )
                                        })
                                    )}
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="completed" className="mt-4">
                            <TabsContent value="all" className="mt-4">
                                <Card className="p-4">
                                    <div className="divide-y">
                                        {completedTodos.length == 0 ? (
                                            <div className="p-6 text-center">
                                                <p className="text-muted-foreground font-noto">No completed tasks</p>
                                            </div>
                                        ) : (
                                            completedTodos.map((todo, index) => {
                                                const color = cardBgColorGenerator();
                                                return (
                                                    <TeamTodoItems
                                                        key={index}
                                                        task={todo.task}
                                                        priority={todo.priority}
                                                        completion_date={todo.task_due_date}
                                                        taskCompletedDate={todo.task_completed_date}
                                                        assignedMemberId={todo.assigned_to.id}
                                                        assignedMemberName={todo.assigned_to.user_name}
                                                        color={color}
                                                        onEditClick={() => handleEditTodoClick()}
                                                        onCompleteClick={() => handleCompleteTodoClick()}
                                                        onCardClick={() => handleTodoCardClick(todo.id)}
                                                    />
                                                )
                                            })
                                        )}
                                    </div>
                                </Card>
                            </TabsContent>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <CreateTeamTodoDialog isDialogOpen={isTodoDialogOpen} setIsDialogOpen={setIsTodoDialogOpen} list_id={list_id} />
            <TeamTodoDetailsDialog isDialogOpen={isTodoDetailsDialogOpen} setIsDialogOpen={setIsTodoDetailsDialogOpen} teamTodo={todoDetailsDialogData} />
        </>
    )
}

export default TeamTodos