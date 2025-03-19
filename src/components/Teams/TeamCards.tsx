import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

interface AvatarDetails {
    imageUrl: string
}

interface TeamCardProps {
    team_name: string;
    team_description: string;
    memberCount: number;
    role: string;
    avatars: AvatarDetails[]
}

const TeamCards: React.FC<TeamCardProps> = ({ team_name, team_description, memberCount, role, avatars }) => {
    return (
        <Card className='p-1 max-[375px]:p-0'>
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-noto font-semibold">{team_name}</CardTitle>
                <CardDescription className="text-sm font-noto font-normal w-52 truncate">{team_description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-1">
                <div className="flex items-center gap-2 max-[375px]:flex-col max-[375px]:items-start">
                    <AvatarCircles numPeople={avatars.length - 1} avatarUrls={avatars} />
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-noto font-normal text-muted-foreground">{memberCount} members</span>
                    </div>
                    <Badge variant="outline" className="ml-auto font-noto font-medium max-[375px]:ml-0">
                        {role}
                    </Badge>
                </div>
            </CardContent>
            <CardFooter className="pt-3">
                <Button className="w-full font-noto text-base font-medium" size='lg'>
                    View Team Tasks
                </Button>
            </CardFooter>
        </Card>
    )
}

export default TeamCards;