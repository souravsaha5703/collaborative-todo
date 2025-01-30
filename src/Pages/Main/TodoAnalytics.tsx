import React from 'react';
import Sidebar from '@/components/NavigationBars/Sidebar';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck,ClockAlert,Hourglass } from 'lucide-react';

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]


const TodoAnalytics: React.FC = () => {
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
                                <div className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50">74%</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <Hourglass className='text-base text-green-500' />
                                <CardTitle className="text-lg font-medium font-noto text-gray-900 dark:text-gray-100">Avg. Completion Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50">74%</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-3">
                                <ClockAlert className='text-base text-red-500' />
                                <CardTitle className="text-lg font-medium font-noto text-gray-900 dark:text-gray-100">Total Overdue Tasks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50">74%</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <CalendarCheck className='text-base text-green-500' />
                                <CardTitle className="text-lg font-medium font-noto text-gray-900 dark:text-gray-100">Task Completion Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-noto font-semibold text-gray-950 dark:text-gray-50">74%</div>
                            </CardContent>
                        </Card>
                    </div>
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
        </>
    )
}

export default TodoAnalytics;