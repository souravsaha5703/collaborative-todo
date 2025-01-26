import React, { useEffect, useState } from 'react';
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
import UpdateTaskTags from '../Tags/UpdateTaskTags';
import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import { removeAllTags } from '@/features/Tags/tagSlice';
import { updateTodo } from '@/features/Todo/todoSlice';
import { database } from '@/Appwrite/appwriteConfig';
import Loader from '../Loaders/Loader';
import { formatToIndianTime } from '@/utils/dateFormatter';

interface TodoDialogProps {
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    id: string,
    selectedTask: string,
    priority: string,
    selectedTags: string[],
    completion_date: string,
    createdBy: string | undefined,
}

const TodoUpdateDialog: React.FC<TodoDialogProps> = ({ isDialogOpen, setIsDialogOpen, id, selectedTask = "", priority = "", selectedTags = [], completion_date = "", createdBy }) => {
    const [date, setDate] = useState<Date>();
    const [task, setTask] = useState<string>(selectedTask);
    const [taskPriority, setTaskPriority] = useState<string>(priority);
    const [taskTags, setTaskTags] = useState<string[]>(selectedTags);
    const [errorOccur, setErrorOccur] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const tags = useAppSelector((state) => state.tag.tags);

    useEffect(() => {
        setTask(selectedTask);
        setTaskPriority(priority);
        setTaskTags(selectedTags);
    }, [selectedTask, priority, selectedTags]);

    const handlePriority = (value: string) => {
        setTaskPriority(value);
    }

    const handleUpdateTaskBtn = async () => {
        if (date == undefined) {
            setDate(new Date(completion_date));
        }
        if (task !== '') {
            setErrorOccur(false);
            setLoading(true);
            setErrorOccur(false);
            setLoading(true);
            try {
                const updatedTodo = await database.updateDocument(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_TODOS_COLLECTION_ID,
                    id, {
                    task: task,
                    completion_date: date,
                    priority: taskPriority,
                    tags: tags,
                    task_status: false,
                    createdBy: createdBy
                }
                );
                dispatch(updateTodo({
                    id: updatedTodo.$id,
                    task: updatedTodo.task,
                    priority: updatedTodo.priority,
                    tags: tags,
                    task_status: false,
                    createdBy: createdBy,
                    completion_date: formatToIndianTime(updatedTodo.completion_date)
                }));
                setTask('');
                setDate(undefined);
                setTaskPriority('None');
                dispatch(removeAllTags());
                setLoading(false);
                setIsDialogOpen(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
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
                    <DialogTitle className='font-noto font-medium text-start'>Update Task</DialogTitle>
                    <DialogDescription asChild>
                        <div className='py-4 w-full px-1 flex flex-col gap-2'>
                            <Input
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                placeholder='Enter Your Task'
                                className='font-noto text-base font-medium max-[425px]:w-full max-[425px]:text-sm'
                                required
                            />
                            <div className='w-full flex gap-2 flex-col'>
                                <p className='font-noto text-sm text-start px-2 font-normal'>Due Date : {completion_date}</p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[300px] justify-start text-left font-noto font-normal",
                                                !date && "text-muted-foreground max-[425px]:w-full"
                                            )}
                                        >
                                            <CalendarIcon />
                                            {date ? format(date, "PPP") : <span>Pick another date</span>}
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
                                <p className='font-noto text-sm text-start px-2 font-normal'>Task priority set to {priority}</p>
                                <Select onValueChange={handlePriority}>
                                    <SelectTrigger className="w-[300px] max-[425px]:w-full font-noto">
                                        <SelectValue placeholder="Change task priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st">1st Priority</SelectItem>
                                        <SelectItem value="2nd">2nd Priority</SelectItem>
                                        <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <UpdateTaskTags selectedTags={taskTags} />

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

export default TodoUpdateDialog