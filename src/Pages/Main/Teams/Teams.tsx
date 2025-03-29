import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { Button } from '@/components/ui/button';
import { Plus, UserRoundPlus } from 'lucide-react';
import TeamCards from '@/components/Teams/TeamCards';
import CreateTeamDialog from '@/components/DialogBoxes/CreateTeamDialog';
import JoinTeamDialog from '@/components/DialogBoxes/JoinTeamDialog';
import { useAppSelector } from '@/hooks/redux-hooks';
import Lottie from "lottie-react";
import loaderAnimation from "@/assets/lottie/loadingAnimation.json";
import useGetAllTeams from '@/hooks/useGetAllTeams';

const Teams: React.FC = () => {
    const [isCreateTeamDialogBoxOpen, setIsCreateTeamDialogBoxOpen] = useState<boolean>(false);
    const [isJoinTeamDialogBoxOpen, setIsJoinTeamDialogBoxOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const user = useAppSelector((state) => state.user.currentUser);
    const teamExists = useGetAllTeams(user?.id ?? "");
    const teams = useAppSelector((state) => state.team.allTeams);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, []);

    const handleCreateTeamBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsCreateTeamDialogBoxOpen(true);
    }

    const handleJoinTeamBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsJoinTeamDialogBoxOpen(true);
    }

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-4'>
                    <div className="flex items-center justify-between max-[860px]:flex-col max-[860px]:items-start max-[860px]:gap-4">
                        <div className='flex flex-col'>
                            <h1 className="text-3xl font-noto font-bold tracking-tight">Teams</h1>
                            <p className="text-muted-foreground font-noto text-base">Create or join teams to collaborate on todo lists with others.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button onClick={handleCreateTeamBtn} size='lg' variant='default' className='w-40 h-12 text-base font-noto font-medium max-[375px]:w-36 max-[375px]:text-sm'><Plus className='max-[375px]:text-base' /> Create Team</Button>
                            <Button onClick={handleJoinTeamBtn} size='lg' variant='secondary' className='w-40 h-12 text-base font-noto font-medium max-[375px]:w-32 max-[375px]:text-sm'><UserRoundPlus className='mr-1' /> Join Team</Button>
                        </div>
                    </div>
                    {loading ? (
                        <div className='w-full py-5 px-1 flex items-center justify-center'>
                            <Lottie animationData={loaderAnimation} />
                        </div>
                    ) : (
                        <div>
                            {teamExists ? (
                                <div className="grid gap-4 min-[840px]:grid-cols-2 mb-20">
                                    {teams.map((team, index) => {
                                        return (
                                            <TeamCards
                                                key={index}
                                                team_id={team.id}
                                                team_name={team.team_name}
                                                team_description={team.team_description}
                                                memberCount={team.memberCount}
                                                role={team.role}
                                                avatars={team.avatars}
                                            />
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed p-8 text-center">
                                    <UserRoundPlus className="mx-auto h-10 w-10 text-muted-foreground" />
                                    <h2 className="mt-2 text-xl font-semibold">No teams found</h2>
                                    <p className="mt-1 text-sm text-muted-foreground">You haven&apos;t created or joined any teams yet.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <CreateTeamDialog isDialogOpen={isCreateTeamDialogBoxOpen} setIsDialogOpen={setIsCreateTeamDialogBoxOpen} />
            <JoinTeamDialog isDialogOpen={isJoinTeamDialogBoxOpen} setIsDialogOpen={setIsJoinTeamDialogBoxOpen} />
        </>
    )
}

export default Teams;