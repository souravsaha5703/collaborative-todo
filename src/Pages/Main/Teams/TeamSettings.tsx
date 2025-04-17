import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import { updateTeamInfo } from '@/features/Teams/teamSlice';
import { toast } from '@/hooks/use-toast';
import MemberDetailsDialog from '@/components/DialogBoxes/MemberDetailsDialog';
import { database } from '@/Appwrite/appwriteConfig';
import Loader from '@/components/Loaders/Loader';

interface MemberInfo {
    id: string;
    avatarImg: string | undefined;
    memberName: string;
    memberEmail: string;
    role: string;
}

interface UpdatedTeamInfo {
    teamId: string;
    teamName: string;
    teamDesc: string;
}

const TeamSettings: React.FC = () => {
    const [teamName, setTeamName] = useState<string>('');
    const [teamDesc, setTeamDesc] = useState<string>('');
    const [isCopied, setIsCopied] = useState(false);
    const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
    const [isMemberDialogOpen, setIsMemberDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const teamData = useAppSelector((state) => state.team.currentTeam);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTeamName(teamData?.team_name ?? "");
        setTeamDesc(teamData?.team_description ?? "");
    }, [teamData?.team_name, teamData?.team_description]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(teamData?.invite_code ?? "")
            .then(() => {
                setIsCopied(true);
                toast({
                    title: "Copied!",
                    description: "Invite code copied to clipboard",
                    duration: 2000,
                });

                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                toast({
                    title: "Error",
                    description: "Failed to copy invite code",
                    variant: "destructive",
                    duration: 2000,
                });
            });
    };

    const handleMemberDialog = (id: string, memberName: string, memberEmail: string, role: string, avatarImg: string | undefined) => {
        setMemberInfo((prev) => ({
            ...prev,
            id: id,
            memberName: memberName,
            memberEmail: memberEmail,
            avatarImg: avatarImg,
            role: role
        }));
        setIsMemberDialogOpen(true);
    }

    const updateTeamBtn = async () => {
        setLoading(true);
        try {
            if (teamData?.id) {
                await database.updateDocument(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_TEAMS_COLLECTION_ID,
                    teamData.id, {
                    team_name: teamName,
                    team_description: teamDesc
                }
                );
                const updatedInfo: UpdatedTeamInfo = {
                    teamId: teamData.id,
                    teamName: teamName,
                    teamDesc: teamDesc
                };
                dispatch(updateTeamInfo(updatedInfo));
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-2 mb-10'>
                    <h1 className="text-3xl font-noto font-bold tracking-tight text-start">Team Settings</h1>
                    <p className="text-muted-foreground font-noto text-start">Manage your team settings and preferences.</p>
                    <div className="grid gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className='font-noto text-lg font-medium text-start'>Team Information</CardTitle>
                                <CardDescription className='font-noto text-base font-normal text-start'>Update your team's basic information.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="team-name" className='font-noto text-base font-normal'>Team Name</Label>
                                    <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder='Enter New Team Name' id='team-name' className='font-noto text-base font-normal' />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="team-description" className='font-noto text-base font-normal'>Description</Label>
                                    <Textarea value={teamDesc} onChange={(e) => setTeamDesc(e.target.value)} placeholder='hehe' id="team-description" className='font-noto text-base font-normal' />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={updateTeamBtn} size={'default'} className='text-sm font-noto font-medium'>
                                    {loading ? (
                                        <Loader color='text-slate-100' />
                                    ) : "Save Changes"}
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="mb-8 mt-4">
                            <CardHeader>
                                <CardTitle className='font-noto text-xl max-[487px]:text-base'>Invite Members</CardTitle>
                                <CardDescription className='font-noto text-base max-[487px]:text-sm'>
                                    Add new members to your team by sharing the invite code or sending an email invitation.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2 items-start">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-base font-noto font-medium">Team Invite Code</p>
                                        <div className="flex items-center gap-2">
                                            <code className="rounded font-noto bg-muted px-4 py-2 font-normal text-base max-[487px]:text-sm">{teamData?.invite_code}</code>
                                            <Button onClick={copyToClipboard} aria-label="Copy invite code" variant="ghost" size="icon" className="h-8 w-8">
                                                {isCopied ? (
                                                    <Check className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                                <span className="sr-only">Copy invite code</span>
                                            </Button>
                                        </div>
                                        <p className="text-sm font-noto text-muted-foreground">Share this code with people you want to join your team.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className='font-noto text-xl max-[487px]:text-base'>Team Members</CardTitle>
                                <CardDescription className='font-noto text-base max-[487px]:text-sm'>Your team has {teamData?.members.length} members.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='space-y-4'>

                                </div>
                                <div className="space-y-4">
                                    {teamData?.members.map((member) => (
                                        <div key={member.id} className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 max-[425px]:gap-2">
                                                <Avatar className='max-[425px]:size-6'>
                                                    <AvatarImage src={member.user_avatar} alt={member.user_name} />
                                                    <AvatarFallback>
                                                        {member.user_name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div onClick={() => handleMemberDialog(member.id, member.user_name, member.user_email, member.role, member.user_avatar)}>
                                                    <p className="font-medium font-noto cursor-pointer max-[487px]:text-sm max-[375px]:w-28 max-[375px]:truncate">{member.user_name}</p>
                                                    <p className="text-sm text-muted-foreground font-noto cursor-pointer max-[375px]:w-28 max-[375px]:truncate">{member.user_email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant={member.role === "admin" ? "default" : "outline"} className='font-noto'>{member.role}</Badge>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-destructive">
                            <CardHeader>
                                <CardTitle className="text-destructive font-noto text-lg font-medium text-start">Danger Zone</CardTitle>
                                <CardDescription className='font-noto text-base font-normal text-start'>Irreversible and destructive actions.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-noto font-medium">Delete Team</h3>
                                    <p className="text-sm font-noto text-muted-foreground">
                                        Permanently delete this team and all of its data. This action cannot be undone.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="destructive" className='text-sm font-noto font-normal'>Delete Team</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <MemberDetailsDialog isDialogOpen={isMemberDialogOpen}
                setIsDialogOpen={setIsMemberDialogOpen}
                avatarImg={memberInfo?.avatarImg}
                id={memberInfo?.id}
                memberEmail={memberInfo?.memberEmail}
                memberName={memberInfo?.memberName}
                role={memberInfo?.role}
            />
        </>
    )
}

export default TeamSettings;