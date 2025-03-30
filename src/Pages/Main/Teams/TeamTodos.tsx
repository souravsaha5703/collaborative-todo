import React, { useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Plus } from 'lucide-react';
import { useAppSelector } from '@/hooks/redux-hooks';
import CreateTeamTodoDialog from '@/components/DialogBoxes/CreateTeamTodoDialog';

const TeamTodos: React.FC = () => {
    const [isTodoDialogOpen, setIsTodoDialogOpen] = useState<boolean>(false);
    const { list_id } = useParams();
    const teamData = useAppSelector((state) => state.team.currentTeam);

    const handleAddTaskBtn = () => {
        setIsTodoDialogOpen(true);
    }

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-4'>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-noto font-bold tracking-tight">name</h1>
                            <p className="text-muted-foreground font-noto">CardDescription</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button onClick={handleAddTaskBtn} size='lg' className='w-32 h-10 text-base font-noto font-medium'><Plus /> Add Task</Button>
                        </div>
                    </div>
                    <Tabs defaultValue="all" className="mb-8">
                        <TabsList>
                            <TabsTrigger value="all" className='font-noto'>All Tasks (5)</TabsTrigger>
                            <TabsTrigger value="pending" className='font-noto'>Pending (2)</TabsTrigger>
                            <TabsTrigger value="completed" className='font-noto'>Completed (1)</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-4">
                            <h1>hehe</h1>
                        </TabsContent>

                        <TabsContent value="pending" className="mt-4">
                            <h1>hehe lol</h1>
                        </TabsContent>

                        <TabsContent value="completed" className="mt-4">
                            <h1>hehe hehe</h1>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <CreateTeamTodoDialog isDialogOpen={isTodoDialogOpen} setIsDialogOpen={setIsTodoDialogOpen} teamId={teamData?.id} list_id={list_id} />
        </>
    )
}

export default TeamTodos