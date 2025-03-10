import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Star, FilePenLine, ClipboardCheck } from "lucide-react";
import { motion } from 'framer-motion';

interface TodoCardProps {
    task: string,
    priority: string,
    completion_date: string,
    taskCompletedDate?: string,
    color?: string,
    onEditClick?: React.MouseEventHandler<SVGSVGElement>,
    onCompleteClick?: React.MouseEventHandler<SVGSVGElement>,
    onCardClick?: React.MouseEventHandler<HTMLHeadingElement>
}

const Todos: React.FC<TodoCardProps> = ({ task, priority, completion_date, color, onEditClick, onCompleteClick, onCardClick, taskCompletedDate }) => {
    const today: Date = new Date();
    const taskDate: Date = new Date(completion_date);
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
            <Card className={`w-64 h-40 ${color} overflow-hidden border-0 rounded-2xl`}>
                <CardHeader className="pb-0 pt-4 px-4">
                    <div className="flex items-center gap-2">
                        <span className='font-noto text-base font-normal text-gray-950'>
                            {priority == '1st' ? (
                                <Star className="w-4 h-4 fill-[#FF8A65] text-[#FF8A65]" />
                            ) : priority == '2nd' ? (
                                <Star className="w-4 h-4 text-[#FF8A65]" />
                            ) : (
                                <></>
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
                    <h3 className="text-2xl font-noto text-start font-medium mb-2 text-gray-950 truncate cursor-pointer" onClick={onCardClick}>{task}</h3>
                    <p className="text-base font-normal font-noto text-gray-800 mb-1">{completion_date}</p>
                    {taskCompletedDate ? (
                        <p className="text-sm font-normal font-noto text-gray-800">Completed On - {taskCompletedDate}</p>
                    ) : (
                        <></>
                    )}
                    <div className='w-full flex items-center justify-end gap-2 z-20'>
                        {onEditClick ? (
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

export default Todos;