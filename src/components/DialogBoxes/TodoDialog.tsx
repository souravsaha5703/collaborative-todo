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
import TaskTags from '../Tags/TaskTags';
import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import { removeAllTags } from '@/features/Tags/tagSlice';
import { database } from '@/Appwrite/appwriteConfig';
import { ID } from 'appwrite';
import Loader from '../Loaders/Loader';

interface TodoDialogProps {
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const TodoDialog: React.FC<TodoDialogProps> = ({ isDialogOpen, setIsDialogOpen }) => {
    const [date, setDate] = useState<Date>();
    const [task, setTask] = useState<string>('');
    const [taskPriority, setTaskPriority] = useState<string>('None');
    const [errorOccur, setErrorOccur] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.currentUser);
    const tags = useAppSelector((state) => state.tag.tags);

    const handlePriority = (value: string) => {
        setTaskPriority(value);
    }

    const handleNewTaskBtn = async () => {
        if (task !== '') {
            setErrorOccur(false);
            setLoading(true);
            if (date !== undefined) {
                setErrorOccur(false);
                setLoading(true);
                try {
                    await database.createDocument(
                        import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                        import.meta.env.VITE_APPWRITE_TODOS_COLLECTION_ID,
                        ID.unique(), {
                        task: task,
                        completion_date: date,
                        priority: taskPriority,
                        tags: tags,
                        task_status: false,
                        createdBy: user?.id
                    }
                    );
                    setTask('');
                    setDate(undefined);
                    dispatch(removeAllTags());
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-noto font-medium'>Add New Task</DialogTitle>
                    <DialogDescription asChild>
                        <div className='py-4 w-full px-1 flex flex-col gap-2'>
                            <Input
                                type='text'
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                placeholder='Enter Your Task'
                                className='font-noto text-base font-medium'
                                required
                            />
                            <div className='w-full flex gap-2'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[200px] justify-start text-left font-noto font-normal",
                                                !date && "text-muted-foreground"
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
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st">1st Priority</SelectItem>
                                        <SelectItem value="2nd">2nd Priority</SelectItem>
                                        <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <TaskTags />
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

export default TodoDialog;