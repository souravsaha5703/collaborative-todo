import React, { useState } from 'react';
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
import { ID } from 'appwrite';
import Loader from '../Loaders/Loader';
import { addTodo } from '@/features/Teams/teamTodoSlice';
import { formatToIndianTime } from '@/utils/dateFormatter';

interface TodoDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    list_id: string | undefined;
}

const CreateTeamTodoDialog: React.FC<TodoDialogProps> = ({ isDialogOpen, setIsDialogOpen, list_id }) => {
    const [date, setDate] = useState<Date>();
    const [task, setTask] = useState<string>('');
    const [taskPriority, setTaskPriority] = useState<string>('None');
    const [taskAssigned, setTaskAssigned] = useState<string>('');
    const [errorOccur, setErrorOccur] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const teamData = useAppSelector((state) => state.team.currentTeam);
    const member = useAppSelector((state) => state.member.currentMember);
    const dispatch = useAppDispatch();

    const handlePriority = (value: string) => {
        setTaskPriority(value);
    }

    const handleAssignedTask = (value: string) => {
        setTaskAssigned(value);
    }

    const handleNewTaskBtn = async () => {
        if (task !== '') {
            setErrorOccur(false);
            setLoading(true);
            if (date !== undefined) {
                setErrorOccur(false);
                setLoading(true);
                try {
                    const createTeamTodo = await database.createDocument(
                        import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                        import.meta.env.VITE_APPWRITE_TEAM_TODOS_COLLECTION_ID,
                        ID.unique(), {
                        task: task,
                        task_due_date: date,
                        priority: taskPriority,
                        task_status: false,
                        createdBy: member?.id,
                        list_id: list_id,
                        assigned_to: taskAssigned
                    }
                    );
                    dispatch(addTodo({
                        assigned_to: {
                            id: createTeamTodo.assigned_to.$id,
                            joined_at: formatToIndianTime(createTeamTodo.assigned_to.joined_at),
                            role: createTeamTodo.assigned_to.role,
                            team_id: createTeamTodo.assigned_to.team_id,
                            user_email: createTeamTodo.assigned_to.user_id.email,
                            user_id: createTeamTodo.assigned_to.user_id.$id,
                            user_name: createTeamTodo.assigned_to.user_id.fullname
                        },
                        createdBy: createTeamTodo.createdBy.$id,
                        id: createTeamTodo.$id,
                        list_id: {
                            createdAt: createTeamTodo.list_id.$createdAt,
                            createdBy: createTeamTodo.list_id.createdBy,
                            id: createTeamTodo.list_id.$id,
                            list_name: createTeamTodo.list_id.list_name,
                            team_id: createTeamTodo.list_id.team_id
                        },
                        priority: createTeamTodo.priority,
                        task: createTeamTodo.task,
                        task_due_date: formatToIndianTime(createTeamTodo.task_due_date),
                        task_status: createTeamTodo.task_status
                    }));
                    setTask('');
                    setDate(undefined);
                    setTaskPriority('None');
                    setTaskAssigned('');
                    setIsDialogOpen(false);
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
                setLoading(false);
            } else {
                setErrorOccur(true);
                setError("Please choose task completion date");
                setLoading(false);
            }
        } else {
            setErrorOccur(true);
            setError("Please enter a task to add");
            setLoading(false);
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className='max-[528px]:w-[400px] max-[425px]:w-[300px]'>
                <DialogHeader>
                    <DialogTitle className='font-noto font-medium text-start'>Add New Team Task</DialogTitle>
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
                            <div className='w-full flex gap-2 max-[425px]:flex-col'>
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
                                <Select onValueChange={handlePriority}>
                                    <SelectTrigger className="w-[120px] max-[425px]:w-full font-noto">
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st">1st Priority</SelectItem>
                                        <SelectItem value="2nd">2nd Priority</SelectItem>
                                        <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Select onValueChange={handleAssignedTask}>
                                <SelectTrigger className="font-noto">
                                    <SelectValue placeholder="Assign Task To" />
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
                                <Button onClick={handleNewTaskBtn} variant={"default"} size={"lg"} className='font-noto text-base font-medium text-center w-36'>Add Task</Button>
                            )}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTeamTodoDialog;