import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

const avatars = [
    {
        imageUrl: "https://avatars.githubusercontent.com/u/16860528",
        
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/20110627",
        
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/106103625",
        
    },
];

const TeamCards: React.FC = () => {
    return (
        <Card className='p-1 max-[375px]:p-0'>
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-noto font-semibold">Tech Team</CardTitle>
                <CardDescription className="text-sm font-noto font-normal w-52 truncate">Building todo application</CardDescription>
            </CardHeader>
            <CardContent className="pb-1">
                <div className="flex items-center gap-2 max-[375px]:flex-col max-[375px]:items-start">
                    <AvatarCircles numPeople={10} avatarUrls={avatars} />
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-noto font-normal text-muted-foreground">6 members</span>
                    </div>
                    <Badge variant="outline" className="ml-auto font-noto font-medium max-[375px]:ml-0">
                        Owner
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