import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { database } from '@/Appwrite/appwriteConfig';
import { Query } from 'appwrite';

interface ListCardProps {
    id: string;
    list_name: string;
    team_id: string;
}

const ListCards: React.FC<ListCardProps> = ({ id, list_name, team_id }) => {
    const [totalTasks, setTotalTasks] = useState<number>(0);
    const [completedTasks, setCompletedTasks] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodos = async () => {
            const result = await database.listDocuments(
                import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                import.meta.env.VITE_APPWRITE_TEAM_TODOS_COLLECTION_ID,
                [
                    Query.equal('list_id', id),
                ]
            );

            setTotalTasks(result.documents.length);
            setCompletedTasks((result.documents.filter(todo => todo.task_status == true)).length);
        }

        fetchTodos();
    }, [id]);

    const handleViewTaskBtn = (list_id: string) => {
        navigate(`/user/teams/team_dashboard/${team_id}/${list_id}/todos`);
    }

    return (
        <Card className='w-[320px] p-1'>
            <CardHeader className="pb-2">
                <CardTitle className='font-noto text-2xl font-semibold'>{list_name}</CardTitle>
                <CardDescription className='font-noto text-base font-normal'>
                    {completedTasks} of {totalTasks} tasks completed
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-2 w-full rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                    />
                </div>
                <div className="mt-4">
                    <Button onClick={() => handleViewTaskBtn(id)} className="w-full font-noto text-base font-medium" size='lg'>
                        View Tasks
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ListCards;