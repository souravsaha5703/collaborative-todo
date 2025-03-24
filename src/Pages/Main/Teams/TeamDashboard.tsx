import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from '../../../components/NavigationBars/Sidebar';
import { Card } from "@/components/ui/card";
import { Settings, Users, PlusCircle } from "lucide-react";
import { useParams } from 'react-router-dom';
import { database } from '@/Appwrite/appwriteConfig';
import { Query, Models } from 'appwrite';
import { useAppSelector } from '@/hooks/redux-hooks';
import CreateListDialog from '../../../components/DialogBoxes/CreateListDialog';
import ListCards from '@/components/Teams/ListCards';
import useGetTeamData from '@/hooks/useGetTeamData';

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

interface ListInterface {
    id: string;
    list_name: string;
    team_id: string;
    createdBy: string;
}

const TeamDashboard: React.FC = () => {
    const [isCreateListDialogBoxOpen, setIsCreateListDialogBoxOpen] = useState<boolean>(false);
    const [teamData, setTeamData] = useState<TeamInterface | null>(null);
    const [lists, setLists] = useState<ListInterface[]>([]);
    const { team_id } = useParams();
    const user = useAppSelector((state) => state.user.currentUser);
    useGetTeamData(team_id);

    useEffect(() => {
        const fetchTeamsData = async () => {
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

        const fetchListsData = async () => {
            const listsData = await database.listDocuments(
                import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                import.meta.env.VITE_APPWRITE_LISTS_COLLECTION_ID,
                [Query.equal('team_id', team_id ?? "")]
            );

            listsData.documents.forEach((data) => {
                let dataObject: ListInterface = {
                    id: data.$id,
                    list_name: data.list_name,
                    team_id: data.$id,
                    createdBy: data.createdBy,
                }

                setLists((prev) => [...prev, dataObject]);
            });
        }

        fetchTeamsData();
        fetchListsData();
    }, [team_id]);

    const handleCreateListBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsCreateListDialogBoxOpen(true);
    }

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
                    {lists.length == 0 && teamData?.role == "member" ? (
                        <div className='w-full flex items-center justify-center'>
                            <h2>No Lists created yet</h2>
                        </div>
                    ) : lists.length == 0 && teamData?.role == "admin" ? (
                        <div className='flex flex-wrap gap-4'>
                            <Card className="w-[320px] flex flex-col items-center justify-center p-2 text-center">
                                <div className="rounded-full bg-muted p-2">
                                    <PlusCircle className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <h3 className="mt-3 font-noto text-base font-medium">Create New List</h3>
                                <p className="mt-1 font-noto text-sm text-muted-foreground">Add a new todo list for your team</p>
                                <Button onClick={handleCreateListBtn} className="w-1/2 font-noto text-base font-medium mt-4" size='lg'>
                                    Create List
                                </Button>
                            </Card>
                        </div>
                    ) : (
                        <div className='flex flex-wrap gap-4'>
                            {lists.map((list, index) => {
                                return (
                                    <ListCards
                                        key={index}
                                        id={list.id}
                                        list_name={list.list_name}
                                        team_id={list.team_id}
                                        createdBy={list.createdBy}
                                    />
                                )
                            })}
                            {teamData?.role == "admin" && (
                                <Card className="w-[320px] flex flex-col items-center justify-center p-2 text-center">
                                    <div className="rounded-full bg-muted p-2">
                                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <h3 className="mt-3 font-noto text-base font-medium">Create New List</h3>
                                    <p className="mt-1 font-noto text-sm text-muted-foreground">Add a new todo list for your team</p>
                                    <Button onClick={handleCreateListBtn} className="w-1/2 font-noto text-base font-medium mt-4" size='lg'>
                                        Create List
                                    </Button>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <CreateListDialog isDialogOpen={isCreateListDialogBoxOpen} setIsDialogOpen={setIsCreateListDialogBoxOpen} createdBy={user?.id} teamId={teamData?.id} />
        </>
    )
}

export default TeamDashboard;