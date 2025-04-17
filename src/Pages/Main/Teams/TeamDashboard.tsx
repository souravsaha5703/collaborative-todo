import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from '../../../components/NavigationBars/Sidebar';
import { Card } from "@/components/ui/card";
import { Settings, PlusCircle, MoreVertical } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux-hooks';
import CreateListDialog from '../../../components/DialogBoxes/CreateListDialog';
import ListCards from '@/components/Teams/ListCards';
import useGetTeamData from '@/hooks/useGetTeamData';
import useGetLists from '@/hooks/useGetLists';
import Lottie from "lottie-react";
import dataLoaderAnimation from "@/assets/lottie/loadingAnimation.json";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const TeamDashboard: React.FC = () => {
    const [isCreateListDialogBoxOpen, setIsCreateListDialogBoxOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { team_id } = useParams();
    const user = useAppSelector((state) => state.user.currentUser);
    useGetTeamData(team_id ?? "");
    useGetLists(team_id ?? "");
    const team = useAppSelector((state) => state.team.currentTeam);
    const lists = useAppSelector((state) => state.list.lists);
    const member = useAppSelector((state) => state.member.currentMember);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 815);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleCreateListBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsCreateListDialogBoxOpen(true);
    }

    const handleSettingsBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("hehe");
        navigate(`/user/teams/team_dashboard/${team_id}/settings`);
    }

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                {loading ? (
                    <div className='w-full py-5 px-1 flex items-center justify-center mt-10'>
                        <Lottie animationData={dataLoaderAnimation} />
                    </div>
                ) : (
                    <div className='w-full p-2 flex flex-col gap-4 mb-10'>
                        <div className="w-full flex items-start justify-between">
                            <div className='flex flex-col gap-1'>
                                <div className="flex items-center gap-4 max-[425px]:flex-col-reverse max-[425px]:items-start max-[425px]:gap-2">
                                    <h1 className="text-3xl font-noto font-bold tracking-tight max-[425px]:text-xl">{team?.team_name}</h1>
                                    <Badge variant="outline" className='font-noto'>
                                        {member?.role}
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground text-base font-noto truncate mt-1 max-[375px]:w-60">{team?.team_description}</p>
                            </div>
                            {isSmallScreen ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Button onClick={handleSettingsBtn} variant="ghost" size="lg">
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span className='font-noto text-base font-medium'>Settings</span>
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex items-center">
                                    <Button onClick={handleSettingsBtn} variant="outline" size="lg">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span className='font-noto text-base font-medium'>Settings</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                        <h1 className="text-xl font-noto font-medium text-start">Todo Lists</h1>
                        {lists.length == 0 && member?.role == "member" ? (
                            <div className='w-full flex items-center justify-center'>
                                <h2>No Lists created yet</h2>
                            </div>
                        ) : lists.length == 0 && member?.role == "admin" ? (
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
                            <div className='flex flex-wrap gap-4 max-[720px]:items-center max-[720px]:justify-center'>
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
                                {member?.role == "admin" && (
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
                )}
            </div>
            <CreateListDialog isDialogOpen={isCreateListDialogBoxOpen} setIsDialogOpen={setIsCreateListDialogBoxOpen} createdBy={user?.id} teamId={team?.id} />
        </>
    )
}

export default TeamDashboard;