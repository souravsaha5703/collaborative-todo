import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, User, UserPen } from "lucide-react";
import { TeamTodosInterface } from '@/utils/AppInterfaces';
import { useAppSelector } from '@/hooks/redux-hooks';

interface DialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    teamTodo: TeamTodosInterface | null;
}

const TeamTodoDetailsDialog: React.FC<DialogProps> = ({ teamTodo, isDialogOpen, setIsDialogOpen }) => {
    const teamData = useAppSelector((state) => state.team.currentTeam);
    let userAvatar: string | undefined = '';
    teamData?.members.forEach(member => {
        if (member.id == teamTodo?.assigned_to.id) {
            userAvatar = member.user_avatar;
        }
    });
    let creatorAvatar: string | undefined = '';
    let creatorName: string | undefined = '';
    teamData?.members.forEach(member => {
        if (member.id == teamTodo?.createdBy) {
            creatorAvatar = member.user_avatar;
            creatorName = member.user_name;
        }
    });

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className={`sm:max-w-[700px]`}>
                <div className="flex items-center gap-2">
                    <span>
                        {teamTodo?.priority == '1st' ? (
                            <Badge
                                variant="outline"
                                className="bg-red-300 font-noto text-xs font-normal text-red-700 border-red-300"
                            >
                                High
                            </Badge>
                        ) : teamTodo?.priority == '2nd' ? (
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
                </div>
                <div className='flex flex-col'>
                    <h3 className="text-3xl mb-2 font-noto text-start font-medium">{teamTodo?.task}</h3>
                    {teamTodo?.task_status == true ? (
                        <Badge
                            variant="outline"
                            className="bg-green-400 w-16 font-noto text-xs font-normal text-green-700 border-green-400"
                        >
                            Completed
                        </Badge>
                    ) : (
                        <Badge
                            variant="outline"
                            className="bg-yellow-300 w-16 font-noto text-xs font-normal text-yellow-700 border-yellow-300"
                        >
                            Pending
                        </Badge>
                    )}
                </div>
                <div className="space-y-3 rounded-lg border p-3">
                    <div className="flex items-center gap-2 text-sm">
                        <UserPen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Created by :</span>
                        <div className='flex items-center gap-2'>
                            <Avatar
                                className="size-10 cursor-pointer hover:ring-2 hover:ring-primary/50"
                            >
                                <AvatarImage src={creatorAvatar} alt={creatorName} />
                                <AvatarFallback>
                                    {creatorName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-lg font-normal font-noto">{creatorName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Assigned to :</span>
                        {teamTodo?.assigned_to.user_name == "none" ? (
                            <></>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <Avatar
                                    className="size-10 cursor-pointer hover:ring-2 hover:ring-primary/50"
                                >
                                    <AvatarImage src={userAvatar} alt={teamTodo?.assigned_to.user_name} />
                                    <AvatarFallback>
                                        {teamTodo?.assigned_to.user_name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-lg font-normal font-noto">{teamTodo?.assigned_to.user_name}</p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Due date : </span>
                        <p className="text-lg font-normal font-noto mb-1">{teamTodo?.task_due_date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Task Completed date : </span>
                        <p className="text-lg font-normal font-noto mb-1">
                            {teamTodo?.task_completed_date == '' ? (
                                "Not Yet Completed"
                            ) : (
                                teamTodo?.task_completed_date
                            )}
                        </p>
                    </div>
                    {teamTodo?.task_updated_at == '' ? (
                        <></>
                    ) : (
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Task Updated At: </span>
                            <p className="text-lg font-normal font-noto mb-1">{teamTodo?.task_updated_at}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TeamTodoDetailsDialog;