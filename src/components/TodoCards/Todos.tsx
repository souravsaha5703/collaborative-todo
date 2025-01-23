import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

interface TodoCardProps {
    task: string,
    priority: string,
    completion_date: string,
    color?: string
}

const Todos: React.FC<TodoCardProps> = ({ task, priority, completion_date, color }) => {
    return (
        <Card className={`w-64 h-42 ${color} overflow-hidden`}>
            <CardHeader className="pb-0 pt-4 px-4">
                <div className="flex items-center gap-2">
                    <span className='font-noto text-base font-normal'>{priority}</span>
                    <span className="text-base font-noto font-medium text-[#FF8A65]">Today</span>
                </div>
            </CardHeader>
            <CardContent className="pt-3 px-4 pb-4">
                <h3 className="text-2xl font-noto text-start font-semibold mb-3">{task}</h3>
                <p className="text-sm font-noto text-gray-600 mb-3">{completion_date}</p>
            </CardContent>
        </Card>
    )
}

export default Todos;