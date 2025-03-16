import React, { useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { Button } from '@/components/ui/button';
import { Plus, UserRoundPlus } from 'lucide-react';
import TeamCards from '@/components/Teams/TeamCards';
import CreateTeamDialog from '@/components/DialogBoxes/CreateTeamDialog';
import JoinTeamDialog from '@/components/DialogBoxes/JoinTeamDialog';

const Teams: React.FC = () => {
    const [isCreateTeamDialogBoxOpen, setIsCreateTeamDialogBoxOpen] = useState<boolean>(false);
    const [isJoinTeamDialogBoxOpen, setIsJoinTeamDialogBoxOpen] = useState<boolean>(false);

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

                    <div className="grid gap-4 min-[840px]:grid-cols-2 mb-20">
                        <TeamCards />
                        <TeamCards />
                        <TeamCards />
                        <TeamCards />

                        {/* <div className="rounded-lg border border-dashed p-8 text-center">
                        <UserRoundPlus className="mx-auto h-10 w-10 text-muted-foreground" />
                        <h2 className="mt-2 text-xl font-semibold">No teams found</h2>
                        <p className="mt-1 text-sm text-muted-foreground">You haven&apos;t created or joined any teams yet.</p>
                        <div className="mt-4 flex justify-center gap-2">
                        <Button size='lg' variant='default' className='w-40 h-12 text-base font-noto font-medium'><Plus className='text-lg mr-1'/> Create Team</Button>
                        <Button size='lg' variant='secondary' className='w-40 h-12 text-base font-noto font-medium'><UserRoundPlus className='text-lg mr-1'/> Join Team</Button>
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>
            <CreateTeamDialog isDialogOpen={isCreateTeamDialogBoxOpen} setIsDialogOpen={setIsCreateTeamDialogBoxOpen} />
            <JoinTeamDialog isDialogOpen={isJoinTeamDialogBoxOpen} setIsDialogOpen={setIsJoinTeamDialogBoxOpen} />
        </>
    )
}

export default Teams;