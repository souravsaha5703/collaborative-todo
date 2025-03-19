import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { Button } from '@/components/ui/button';
import { Plus, UserRoundPlus } from 'lucide-react';
import TeamCards from '@/components/Teams/TeamCards';
import CreateTeamDialog from '@/components/DialogBoxes/CreateTeamDialog';
import JoinTeamDialog from '@/components/DialogBoxes/JoinTeamDialog';
import { useAppSelector } from '@/hooks/redux-hooks';
import { database, storage } from '@/Appwrite/appwriteConfig';
import { Models, Query } from 'appwrite';

interface AvatarDetails {
    imageUrl: string
}

interface TeamInterface {
    id: string;
    team_name: string;
    team_description: string;
    createdBy: string;
    invite_code: string;
    createdAt: string;
    memberCount: number;
    role: string;
    avatars: AvatarDetails[]
}

const Teams: React.FC = () => {
    const [isCreateTeamDialogBoxOpen, setIsCreateTeamDialogBoxOpen] = useState<boolean>(false);
    const [isJoinTeamDialogBoxOpen, setIsJoinTeamDialogBoxOpen] = useState<boolean>(false);
    const [teamExists, setTeamExists] = useState<boolean>(true);
    const [teams, setTeams] = useState<TeamInterface[]>([]);

    const user = useAppSelector((state) => state.user.currentUser);

    useEffect(() => {
        const getTeams = async () => {
            if (user?.id) {
                const memberships = await database.listDocuments(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_MEMBERS_COLLECTION_ID,
                    [Query.equal('user_id', user.id)]
                );

                if (memberships.documents.length > 0) {
                    setTeamExists(true);
                    const allTeams = memberships.documents.map(membership => membership.team_id);
                    const teamIds: string[] = [];
                    allTeams.forEach(team => {
                        teamIds.push(team.$id);
                    });

                    const queries = teamIds.map(id => Query.equal('$id', id));

                    if (teamIds.length > 0) {
                        const teamsData = await database.listDocuments(
                            import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                            import.meta.env.VITE_APPWRITE_TEAMS_COLLECTION_ID,
                            queries
                        );

                        teamsData.documents.forEach(async (data) => {
                            let userRole = data.members.map((member: Models.Document) => member.user_id.$id == user.id ? member.role : "");
                            let membersAvatarIds = data.members.map((member: Models.Document) => member.user_id.profileImage);
                            const membersAvatar: AvatarDetails[] = [];
                            membersAvatarIds.forEach((id: string) => {
                                const imageUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_PROFILE_IMAGE_BUCKET_ID, id);
                                membersAvatar.push({
                                    imageUrl: imageUrl
                                });
                            });
                            let dataObject: TeamInterface = {
                                id: data.$id,
                                team_name: data.team_name,
                                team_description: data.team_description,
                                createdBy: data.createdBy,
                                invite_code: data.invite_code,
                                createdAt: data.$createdAt,
                                memberCount: data.members.length,
                                role: userRole,
                                avatars: membersAvatar
                            }
                            setTeams((prev) => [...prev, dataObject]);
                        });
                    }
                } else {
                    setTeamExists(false);
                }
            }
        }

        getTeams();
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
                    {teamExists ? (
                        <div className="grid gap-4 min-[840px]:grid-cols-2 mb-20">
                            {teams.map((team, index) => {
                                return (
                                    <TeamCards
                                        key={index}
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
            </div>
            <CreateTeamDialog isDialogOpen={isCreateTeamDialogBoxOpen} setIsDialogOpen={setIsCreateTeamDialogBoxOpen} />
            <JoinTeamDialog isDialogOpen={isJoinTeamDialogBoxOpen} setIsDialogOpen={setIsJoinTeamDialogBoxOpen} />
        </>
    )
}

export default Teams;