import React, { useState } from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useAppSelector } from '@/hooks/redux-hooks';
import { toast } from '@/hooks/use-toast';
import MemberDetailsDialog from '@/components/DialogBoxes/MemberDetailsDialog';

interface MemberInfo {
    id: string;
    avatarImg: string | undefined;
    memberName: string;
    memberEmail: string;
    role: string;
}

const TeamMembers: React.FC = () => {
    const [isCopied, setIsCopied] = useState(false);
    const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
    const [isMemberDialogOpen, setIsMemberDialogOpen] = useState<boolean>(false);
    const teamData = useAppSelector((state) => state.team.currentTeam);

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

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-2 mb-10'>
                    <h1 className="text-3xl font-noto font-bold tracking-tight max-[487px]:text-xl">{teamData?.team_name}</h1>
                    <p className="text-muted-foreground font-noto text-lg max-[487px]:text-base">{teamData?.team_description}</p>
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

export default TeamMembers;