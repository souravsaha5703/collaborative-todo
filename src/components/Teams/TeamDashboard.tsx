import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from '../NavigationBars/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Users, PlusCircle } from "lucide-react";
import { useParams } from 'react-router-dom';
import { database } from '@/Appwrite/appwriteConfig';
import { Query, Models } from 'appwrite';
import { useAppSelector } from '@/hooks/redux-hooks';

interface TeamInterface {
    id: string;
    team_name: string;
    team_description: string;
    createdBy: string;
    invite_code: string;
    createdAt: string;
    memberCount: number;
    role?: string;
}

const TeamDashboard: React.FC = () => {
    const [teamData, setTeamData] = useState<TeamInterface | null>();
    const { team_id } = useParams();
    const user = useAppSelector((state) => state.user.currentUser);

    useEffect(() => {
        const fetchTeamData = async () => {
            const teamsData = await database.listDocuments(
                import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                import.meta.env.VITE_APPWRITE_TEAMS_COLLECTION_ID,
                [Query.equal('$id', team_id ?? "")]
            );

            let userRole = teamsData.documents[0].members.map((member: Models.Document) => member.user_id.$id == user?.id ? member.role : "");

            setTeamData(prevData => ({
                ...prevData,
                id: team_id ?? "",
                team_name: teamsData.documents[0].team_name,
                team_description: teamsData.documents[0].team_description,
                createdBy: teamsData.documents[0].createdBy,
                invite_code: teamsData.documents[0].invite_code,
                createdAt: teamsData.documents[0].$createdAt,
                memberCount: teamsData.documents[0].members.length,
                role: userRole
            }));
        }

        fetchTeamData();
    }, [team_id]);

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-4'>
                    <div className="w-full flex items-start justify-between">
                        <div className='flex flex-col gap-1'>
                            <div className="flex items-center gap-4">
                                <h1 className="text-3xl font-noto font-bold tracking-tight">{teamData?.team_name}</h1>
                                <Badge variant="outline" className='font-noto'>{teamData?.role}</Badge>
                            </div>
                            <p className="text-muted-foreground font-noto">Collaboration on ui ux</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="lg">
                                <Users className="mr-2 h-4 w-4" />
                                <span className='font-noto text-base font-medium'>Members</span>
                            </Button>
                            <Button variant="outline" size="lg">
                                <Settings className="mr-2 h-4 w-4" />
                                <span className='font-noto text-base font-medium'>Settings</span>
                            </Button>
                        </div>
                    </div>
                    <h1 className="text-xl font-noto font-medium text-start">Todo Lists</h1>
                    <div className='flex flex-wrap gap-4'>
                        <Card className='w-[320px] p-1'>
                            <CardHeader className="pb-2">
                                <CardTitle className='font-noto text-2xl font-semibold'>q1 campaign</CardTitle>
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
                                    <Button className="w-full font-noto text-base font-medium" size='lg'>
                                        View Tasks
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-[320px] flex flex-col items-center justify-center p-2 text-center">
                            <div className="rounded-full bg-muted p-2">
                                <PlusCircle className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <h3 className="mt-3 font-noto text-base font-medium">Create New List</h3>
                            <p className="mt-1 font-noto text-sm text-muted-foreground">Add a new todo list for your team</p>
                            <Button className="w-1/2 font-noto text-base font-medium mt-4" size='lg'>
                                Create List
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamDashboard;