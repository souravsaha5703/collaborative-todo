import React from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import useGetTodos from '@/hooks/useGetTodos';
import { Bar, BarChart, CartesianGrid, XAxis, PieChart, Pie, Tooltip, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, ClockAlert, Hourglass, Timer } from 'lucide-react';
import { useAppSelector } from '@/hooks/redux-hooks';
import { Todos as TodoInterface } from '@/utils/AppInterfaces';
import { NumberTicker } from "@/components/magicui/number-ticker";
import CircularScoreRing from "@/components/ui/circular-score-ring";
import { calculateChartData } from '@/controllers/calculateChartData';
import { calculateTaskDistribution, calculateTaskStatus } from '@/controllers/calculatePichartData';
import { calculateProductivityScore } from '@/controllers/calculateProductivityscore';
import RenderCustomizedLabel from '@/components/ui/pieChartLabel';
import { safeNumber } from '@/utils/verifyFormat';

const chartConfig = {
    taskCreated: {
        label: "Task Created",
        color: "#ea580c",
    },
    taskCompleted: {
        label: "Task Completed",
        color: "#fdba74",
    },
} satisfies ChartConfig

interface ChartDataInterface {
    month: string,
    taskCreated: number,
    taskCompleted: number
}

const TodoAnalytics: React.FC = () => {
    useGetTodos();
    const todos = useAppSelector((state) => state.todo.todos);

    const completedTasks: TodoInterface[] = todos.filter(todo => todo.task_status == true);
    const inCompleteTasks: TodoInterface[] = todos.filter(todo => todo.task_status == false);
    const taskCompletionRate: string = ((completedTasks.length / todos.length) * 100).toFixed(1);

    const taskCompletionDuration: number[] = [];

    completedTasks.forEach(task => {
        let taskCreationTime: Date = new Date(task.task_created ?? "");
        let taskCompletionTime: Date = new Date(task.task_completed_date ?? "");

        let timeTaken: number = Math.abs(taskCompletionTime.getTime() - taskCreationTime.getTime());

        taskCompletionDuration.push(timeTaken);
    });

    let sumOfTime: number = 0;

    taskCompletionDuration.forEach(time => {
        sumOfTime = sumOfTime + time;
    });

    const avgCompletionTime: string = ((sumOfTime / completedTasks.length) / (1000 * 60 * 60 * 24)).toFixed(0);

    const onTimeCompletedTasks = completedTasks.filter(task => {
        let taskCompletionTime: Date = new Date(task.completion_date);
        let actualTaskCompletedTime: Date = new Date(task.task_completed_date ?? "");

        if (actualTaskCompletedTime <= taskCompletionTime) {
            return task
        }
    });

    const onTimeTaskCompletionRate = ((onTimeCompletedTasks.length / completedTasks.length) * 100).toFixed(1);

    const chartData: ChartDataInterface[] = calculateChartData(todos, completedTasks);

    const pieChartData: { name: string, value: number }[] = calculateTaskDistribution(todos);
    const pieChartDataForTaskStatus: { name: string, value: number }[] = calculateTaskStatus(todos);
    const COLORS: string[] = ["#f97316", "#fed7aa", "#eab308"];

    const productivityScore: number = calculateProductivityScore(taskCompletionRate, onTimeTaskCompletionRate, inCompleteTasks, completedTasks);

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <div className='w-full p-2 flex flex-col gap-4'>
                    <h1 className='font-noto text-4xl font-medium text-start text-gray-900 dark:text-gray-200 max-[425px]:text-3xl'>Task Analytics Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <CalendarCheck className='text-base text-green-500' />
                                <CardTitle className="text-lg font-medium font-noto text-gray-900 dark:text-gray-100">Task Completion Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='flex gap-1'>
                                    <NumberTicker value={safeNumber(taskCompletionRate)} className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50" />
                                    <span className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50">%</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <Hourglass className='text-base text-green-500' />
                                <CardTitle className="text-lg font-medium font-noto text-gray-900 dark:text-gray-100">Avg. Completion Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='flex gap-1'>
                                    <NumberTicker value={safeNumber(avgCompletionTime)} className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50" />
                                    <span className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50">Days</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-3">
                                <ClockAlert className='text-base text-red-500' />
                                <CardTitle className="text-lg font-medium font-noto text-gray-900 dark:text-gray-100">Total Overdue Tasks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='flex gap-1'>
                                    <NumberTicker value={inCompleteTasks.length} className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50" />
                                    <span className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50">Tasks</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <Timer className='text-base text-green-500' />
                                <CardTitle className="text-lg font-medium font-noto text-gray-900 dark:text-gray-100">On Time Completion Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='flex gap-1'>
                                    <NumberTicker value={safeNumber(onTimeTaskCompletionRate)} className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50" />
                                    <span className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50">%</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <h1 className='font-noto text-3xl font-medium text-start text-gray-900 dark:text-gray-200'>Your Monthly Activity Chart</h1>
                    <ChartContainer config={chartConfig} className="h-[350px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={true}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="taskCreated" fill="var(--color-taskCreated)" radius={4} />
                            <Bar dataKey="taskCompleted" fill="var(--color-taskCompleted)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                    <h1 className='font-noto text-3xl font-medium text-start text-gray-900 dark:text-gray-200 max-[425px]:text-2xl'>Your Productivity Score</h1>
                    <div className='w-full p-5 flex gap-14 mb-10 max-[862px]:flex-col max-[600px]:gap-8 max-[461px]:p-2'>
                        <CircularScoreRing score={productivityScore} />
                        <div className='flex flex-col gap-1 p-5 max-[461px]:p-2'>
                            <h1 className='font-noto text-xl font-medium text-start text-gray-900 dark:text-gray-200 max-[532px]:text-base'>Productivity Score measures on the basis of following Parameters :-</h1>
                            <div className='flex gap-10 max-[532px]:gap-2'>
                                <div className='flex flex-col text-center'>
                                    <h2 className='font-noto text-lg font-normal text-gray-900 dark:text-gray-200 underline max-[532px]:text-base'>Parameters</h2>
                                    <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200 max-[532px]:text-sm max-[401px]:text-xs'> - Task Completion Rate </h4>
                                    <h4 className='font-noto text-base font-normal text-start truncate text-gray-900 dark:text-gray-200 max-[532px]:text-sm max-[401px]:text-xs'> - On Time Task Completion Rate </h4>
                                    <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200 max-[532px]:text-sm max-[401px]:text-xs'> - Time Efficiency </h4>
                                    <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200 max-[532px]:text-sm max-[401px]:text-xs'> - Prority Completion </h4>
                                    <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200 max-[532px]:text-sm max-[401px]:text-xs'> - Overdue Tasks </h4>
                                </div>
                                <div className='flex flex-col text-center'>
                                    <h2 className='font-noto text-lg font-normal text-gray-900 dark:text-gray-200 underline max-[532px]:text-base'>Weightage</h2>
                                    <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200 max-[532px]:text-sm max-[401px]:text-xs'> ( 40% weight )</h4>
                                    <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200 max-[532px]:text-sm max-[401px]:text-xs'> ( 20% weight )</h4>
                                    <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200 max-[532px]:text-sm max-[401px]:text-xs'> ( 20% weight )</h4>
                                    <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200 max-[532px]:text-sm max-[401px]:text-xs'> ( 10% weight )</h4>
                                    <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200 max-[532px]:text-sm max-[401px]:text-xs'> ( 10% weight )</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className='font-noto text-3xl font-medium text-start text-gray-900 dark:text-gray-200 max-[425px]:text-2xl'>Your Task Distribution by Priority</h1>
                    <div className='w-full p-3 flex gap-5 mb-10 max-[862px]:flex-col'>
                        <PieChart width={250} height={200}>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={RenderCustomizedLabel}
                            >
                                {pieChartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        <div className='flex gap-3 items-center'>
                            <div className='flex flex-col text-center gap-2'>
                                <span className="w-4 h-4 bg-[#eab308] rounded"></span>
                                <span className="w-4 h-4 bg-[#f97316] rounded"></span>
                                <span className="w-4 h-4 bg-[#fed7aa] rounded"></span>
                            </div>
                            <div className='flex flex-col text-center'>
                                <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200'>Priority Level 1st</h4>
                                <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200'>Priority Level 2nd</h4>
                                <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200'>Priority Level none</h4>
                            </div>
                        </div>
                    </div>
                    <h1 className='font-noto text-3xl font-medium text-start text-gray-900 dark:text-gray-200 max-[425px]:text-2xl'>Your Task Distribution by Task Status</h1>
                    <div className='w-full p-3 flex gap-5 mb-10 max-[862px]:flex-col'>
                        <PieChart width={250} height={200}>
                            <Pie
                                data={pieChartDataForTaskStatus}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={RenderCustomizedLabel}
                            >
                                {pieChartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        <div className='flex gap-3 items-center'>
                            <div className='flex flex-col text-center gap-2'>
                                <span className="w-4 h-4 bg-[#f97316] rounded"></span>
                                <span className="w-4 h-4 bg-[#fed7aa] rounded"></span>
                            </div>
                            <div className='flex flex-col text-center'>
                                <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200'>Completed Task</h4>
                                <h4 className='font-noto text-base font-normal text-start text-gray-900 dark:text-gray-200'>Incomplete Task</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoAnalytics;