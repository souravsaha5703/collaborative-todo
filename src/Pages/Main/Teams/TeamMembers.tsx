import React from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useAppSelector } from '@/hooks/redux-hooks';

const TeamMembers: React.FC = () => {
    const teamData = useAppSelector((state) => state.team.currentTeam);

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-2'>
                    <h1 className="text-3xl font-noto font-bold tracking-tight">{teamData?.team_name}</h1>
                    <p className="text-muted-foreground font-noto text-lg">{teamData?.team_description}</p>
                    <Card className="mb-8 mt-4">
                        <CardHeader>
                            <CardTitle className='font-noto text-xl'>Invite Members</CardTitle>
                            <CardDescription className='font-noto text-base'>
                                Add new members to your team by sharing the invite code or sending an email invitation.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2 items-start">
                                <div className="flex-1 space-y-1">
                                    <p className="text-base font-noto font-medium">Team Invite Code</p>
                                    <div className="flex items-center gap-2">
                                        <code className="rounded font-noto bg-muted px-4 py-2 font-normal text-base">{teamData?.invite_code}</code>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Copy className="h-4 w-4" />
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
                            <CardTitle className='font-noto text-xl'>Team Members</CardTitle>
                            <CardDescription className='font-noto text-base'>Your team has {teamData?.members.length} members.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>

                            </div>
                            <div className="space-y-4">
                                {teamData?.members.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={member.user_avatar} alt={member.user_name} />
                                                <AvatarFallback>
                                                    {member.user_name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium font-noto">{member.user_name}</p>
                                                <p className="text-sm text-muted-foreground font-noto">{member.user_email}</p>
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
        </>
    )
}

export default TeamMembers;