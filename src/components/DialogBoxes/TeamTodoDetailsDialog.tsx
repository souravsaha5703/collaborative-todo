import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, Clock, Paperclip, Send, Tag, User } from "lucide-react";
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
                    <h3 className="text-3xl font-noto text-start font-medium">{teamTodo?.task}</h3>
                    {teamTodo?.task_status == true ? (
                        <Badge
                            variant="outline"
                            className="bg-green-400 font-noto text-xs font-normal text-green-700 border-green-400"
                        >
                            Completed
                        </Badge>
                    ) : (
                        <Badge
                            variant="outline"
                            className="bg-red-300 font-noto text-xs font-normal text-red-700 border-red-300"
                        >
                            Pending
                        </Badge>
                    )}
                </div>
                <div className="space-y-3 rounded-lg border p-3">
                    <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Assigned to:</span>
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
                        <span className="text-muted-foreground">Due date: </span>
                        <p className="text-lg font-normal font-noto mb-1">{teamTodo?.task_due_date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Task Completed date: </span>
                        <p className="text-lg font-normal font-noto mb-1">
                            {teamTodo?.task_completed_date == '' ? (
                                "Not Yet Completed"
                            ) : (
                                teamTodo?.task_completed_date
                            )}
                        </p>
                    </div>
                </div>


                {/* <div>
                            <h3 className="mb-2 text-sm font-medium">Actions</h3>
                            <div className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start" onClick={onAssign}>
                                    <User className="mr-2 h-4 w-4" />
                                    {task.assignedTo ? "Change Assignee" : "Assign Task"}
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Change Due Date
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                    <Paperclip className="mr-2 h-4 w-4" />
                                    Add Attachment
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start text-destructive">
                                    Delete Task
                                </Button>
                            </div>
                        </div> */}
            </DialogContent>
        </Dialog>
    )
}

export default TeamTodoDetailsDialog;