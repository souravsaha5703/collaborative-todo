import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '../ui/badge';
import { FilePenLine, ClipboardCheck } from "lucide-react";
import { motion } from 'framer-motion';
import { useAppSelector } from '@/hooks/redux-hooks';

interface TodoCardProps {
    task: string;
    priority: string;
    completion_date: string;
    assignedMemberId: string;
    assignedMemberName: string;
    taskCompletedDate?: string,
    color?: string;
    createdBy?: string | undefined;
    onEditClick?: React.MouseEventHandler<SVGSVGElement>;
    onCompleteClick?: React.MouseEventHandler<SVGSVGElement>;
    onCardClick?: React.MouseEventHandler<HTMLHeadingElement>;
}

const TeamTodoItems: React.FC<TodoCardProps> = ({ task, priority, completion_date, assignedMemberId, assignedMemberName, color, taskCompletedDate, createdBy, onEditClick, onCompleteClick, onCardClick }) => {
    const teamData = useAppSelector((state) => state.team.currentTeam);
    const member = useAppSelector((state) => state.member.currentMember);
    const today: Date = new Date();
    const taskDate: Date = new Date(completion_date);

    let userAvatar: string | undefined = '';
    teamData?.members.forEach(member => {
        if (member.id == assignedMemberId) {
            userAvatar = member.user_avatar;
        }
    });
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <Card className={`w-full ${color} overflow-hidden border-0 rounded-xl`}>
                <CardHeader className="pb-0 pt-4 px-4">
                    <div className="flex items-center gap-2">
                        <span>
                            {priority == '1st' ? (
                                <Badge
                                    variant="outline"
                                    className="bg-red-300 font-noto text-xs font-normal text-red-700 border-red-300"
                                >
                                    High
                                </Badge>
                            ) : priority == '2nd' ? (
                                <Badge
                                    variant="outline"
                                    className="bg-yellow-300 font-noto text-xs font-normal text-yellow-700 border-yello-300"
                                >
                                    Medium
                                </Badge>
                            ) : (
                                <Badge
                                    variant="outline"
                                    className="bg-blue-300 font-noto text-xs font-normal text-blue-700 border-blue-300"
                                >
                                    Low
                                </Badge>
                            )}
                        </span>
                        <span className="text-base font-noto font-medium text-[#FF8A65]">
                            {taskDate.toDateString() == today.toDateString() ? (
                                "Today"
                            ) : (
                                <></>
                            )}
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="pt-2 px-4 pb-4">
                    <h3 className="text-3xl font-noto text-start font-medium text-gray-950 cursor-pointer" onClick={onCardClick}>{task}</h3>
                    <p className="text-lg font-normal font-noto text-gray-800 mb-1">Due Date - {completion_date}</p>
                    {assignedMemberName == "none" ? (
                        <></>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Avatar
                                className="size-6 cursor-pointer hover:ring-2 hover:ring-primary/50"
                            >
                                <AvatarImage src={userAvatar} alt={assignedMemberName} />
                                <AvatarFallback>
                                    {assignedMemberName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-lg font-normal font-noto text-gray-800 mb-1">Assign To - {assignedMemberName}</p>
                        </div>
                    )}

                    {taskCompletedDate ? (
                        <p className="text-lg font-normal font-noto text-gray-800">Completed On - {taskCompletedDate}</p>
                    ) : (
                        <></>
                    )}
                    <div className='w-full flex items-center justify-end gap-2 z-20'>
                        {onEditClick && createdBy == member?.id ? (
                            <FilePenLine onClick={onEditClick} className='text-[#FF8A65] text-sm cursor-pointer' />
                        ) : (
                            <></>
                        )}
                        {onCompleteClick ? (
                            <ClipboardCheck onClick={onCompleteClick} className='text-[#FF8A65] text-sm cursor-pointer' />
                        ) : (
                            <></>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>

    )
}

export default TeamTodoItems;