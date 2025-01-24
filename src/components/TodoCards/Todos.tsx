import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";

interface TodoCardProps {
    task: string,
    priority: string,
    completion_date: string,
    color?: string,
    onclick: React.MouseEventHandler<HTMLDivElement>
}

const Todos: React.FC<TodoCardProps> = ({ task, priority, completion_date, color, onclick }) => {
    return (
        <Card className={`w-64 h-40 ${color} overflow-hidden border-0 cursor-pointer rounded-2xl max-[425px]:h-36`} onClick={onclick}>
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
                    <span className="text-base font-noto font-medium text-[#FF8A65]">Today</span>
                </div>
            </CardHeader>
            <CardContent className="pt-3 px-4 pb-4">
                <h3 className="text-2xl font-noto text-start font-medium mb-3 text-gray-950 truncate">{task}</h3>
                <p className="text-base font-normal font-noto text-gray-800 mb-3">{completion_date}</p>
            </CardContent>
        </Card>
    )
}

export default Todos;