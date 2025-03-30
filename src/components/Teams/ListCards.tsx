import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface ListCardProps {
    id: string;
    list_name: string;
    team_id: string;
    createdBy: string;
}

const ListCards: React.FC<ListCardProps> = ({ id, list_name, team_id, createdBy }) => {
    const navigate = useNavigate();

    const handleViewTaskBtn = (list_id:string) => {
        navigate(`/user/teams/team_dashboard/${team_id}/${list_id}/todos`);
    }

    return (
        <Card className='w-[320px] p-1'>
            <CardHeader className="pb-2">
                <CardTitle className='font-noto text-2xl font-semibold'>{list_name}</CardTitle>
                <CardDescription className='font-noto text-base font-normal'>
                    5 of 12 tasks completed
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-2 w-full rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${.2 * 100}%` }}
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