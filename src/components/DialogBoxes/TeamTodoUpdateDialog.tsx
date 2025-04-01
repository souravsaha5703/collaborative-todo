import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import { database } from '@/Appwrite/appwriteConfig';
import Loader from '../Loaders/Loader';
import { TeamTodosInterface } from '@/utils/AppInterfaces';
import { updateTodo } from '@/features/Teams/teamTodoSlice';
import { formatToIndianTime } from '@/utils/dateFormatter';

interface DialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    teamTodo: TeamTodosInterface | null;
}

const TeamTodoUpdateDialog: React.FC<DialogProps> = ({ teamTodo, isDialogOpen, setIsDialogOpen }) => {
    const [date, setDate] = useState<Date>();
    const [task, setTask] = useState<string>('');
    const [taskPriority, setTaskPriority] = useState<string>('None');
    const [taskAssigned, setTaskAssigned] = useState<string>('');
    const [errorOccur, setErrorOccur] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const teamData = useAppSelector((state) => state.team.currentTeam);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTask(teamTodo?.task ?? "");
        setTaskPriority(teamTodo?.priority ?? "None");
        setTaskAssigned(teamTodo?.assigned_to.id ?? "");
    }, [teamTodo?.task, teamTodo?.priority, teamTodo?.assigned_to.id]);

    const handlePriority = (value: string) => {
        setTaskPriority(value);
    }

    const handleAssignedTask = (value: string) => {
        setTaskAssigned(value);
    }

    const handleUpdateTaskBtn = async () => {
        if (date == undefined) {
            setDate(new Date(teamTodo?.task_due_date ?? ""));
        }
        if (task !== '') {
            setErrorOccur(false);
            setLoading(true);
            setErrorOccur(false);
            setLoading(true);
            if (teamTodo?.id) {
                try {
                    const updatedTodo = await database.updateDocument(
                        import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                        import.meta.env.VITE_APPWRITE_TEAM_TODOS_COLLECTION_ID,
                        teamTodo.id, {
                        task: task,
                        task_due_date: date,
                        priority: taskPriority,
                        assigned_to: taskAssigned,
                        task_updated_at: new Date().toISOString(),
                    }
                    );
                    dispatch(updateTodo({
                        assigned_to: {
                            id: updatedTodo.assigned_to.$id,
                            joined_at: formatToIndianTime(updatedTodo.assigned_to.joined_at),
                            role: updatedTodo.assigned_to.role,
                            team_id: updatedTodo.assigned_to.team_id,
                            user_email: updatedTodo.assigned_to.user_id.email,
                            user_id: updatedTodo.assigned_to.user_id.$id,
                            user_name: updatedTodo.assigned_to.user_id.fullname
                        },
                        createdBy: updatedTodo.createdBy.$id,
                        id: updatedTodo.$id,
                        list_id: {
                            createdAt: updatedTodo.list_id.$createdAt,
                            createdBy: updatedTodo.list_id.createdBy,
                            id: updatedTodo.list_id.$id,
                            list_name: updatedTodo.list_id.list_name,
                            team_id: updatedTodo.list_id.team_id
                        },
                        priority: updatedTodo.priority,
                        task: updatedTodo.task,
                        task_due_date: formatToIndianTime(updatedTodo.task_due_date),
                        task_status: updatedTodo.task_status,
                        task_created: formatToIndianTime(updatedTodo.$createdAt),
                        task_updated_at: (updatedTodo.task_updated_at == null ? "" : formatToIndianTime(updatedTodo.task_updated_at))
                    }));
                    setTask('');
                    setDate(undefined);
                    setTaskPriority('None');
                    setTaskAssigned('');
                    setLoading(false);
                    setIsDialogOpen(false);

                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            }
        } else {
            setErrorOccur(true);
            setError("Empty task not allowed");
            setLoading(false);
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className='max-[528px]:w-[400px] max-[425px]:w-[300px]'>
                <DialogHeader>
                    <DialogTitle className='font-noto font-medium text-start'>Update Team Task</DialogTitle>
                    <DialogDescription asChild>
                        <div className='py-4 w-full px-1 flex flex-col gap-2'>
                            <Input
                                type='text'
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                placeholder='Enter Your Team Task'
                                className='font-noto text-base font-medium max-[425px]:w-full max-[425px]:text-sm'
                                required
                            />
                            <div className='w-full flex gap-2 flex-col'>
                                <p className='font-noto text-sm text-start px-2 font-normal'>Due Date : {teamTodo?.task_due_date}</p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[200px] justify-start text-left font-noto font-normal",
                                                !date && "text-muted-foreground max-[425px]:w-full"
                                            )}
                                        >
                                            <CalendarIcon />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="start"
                                        className="flex w-auto flex-col space-y-2 p-2"
                                    >
                                        <Select
                                            onValueChange={(value) =>
                                                setDate(addDays(new Date(), parseInt(value)))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="0">Today</SelectItem>
                                                <SelectItem value="1">Tomorrow</SelectItem>
                                                <SelectItem value="3">In 3 days</SelectItem>
                                                <SelectItem value="7">In a week</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="rounded-md border">
                                            <Calendar mode="single" selected={date} onSelect={setDate} />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <p className='font-noto text-sm text-start px-2 font-normal'>Task priority set to {taskPriority}</p>
                                <Select onValueChange={handlePriority}>
                                    <SelectTrigger className="w-[150px] max-[425px]:w-full font-noto">
                                        <SelectValue placeholder="Change Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st">1st Priority</SelectItem>
                                        <SelectItem value="2nd">2nd Priority</SelectItem>
                                        <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <p className='font-noto text-sm text-start px-2 font-normal'>Task Assgined To {teamTodo?.assigned_to.user_name}</p>
                            <Select onValueChange={handleAssignedTask}>
                                <SelectTrigger className="font-noto">
                                    <SelectValue placeholder="Change Task Assignation" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teamData?.members.map((member, index) => {
                                        return (
                                            <SelectItem key={index} value={member.id}>{member.user_name}</SelectItem>
                                        )
                                    })}
                                    <SelectItem value="none">None</SelectItem>
                                </SelectContent>
                            </Select>
                            {errorOccur && <p className='font-noto text-start font-normal text-base text-red-500'>{error}</p>}
                            {loading ? (
                                <div className='mt-4 w-36 flex items-center justify-center'>
                                    <Loader />
                                </div>
                            ) : (
                                <Button onClick={handleUpdateTaskBtn} variant={"default"} size={"lg"} className='font-noto text-base font-medium text-center w-36'>Update Task</Button>
                            )}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default TeamTodoUpdateDialog;