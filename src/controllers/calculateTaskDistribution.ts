import { Todos as TodoInterface } from "@/utils/AppInterfaces";

interface PriorityData {
    name: string
    value: number
}

export const calculateTaskDistribution = (todos: TodoInterface[]): PriorityData[] => {
    const taskPriorityOccurance: Record<string, number> = todos.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const pieChartData: PriorityData[] = Object.entries(taskPriorityOccurance).map(([priority, count]) => ({
        name: priority,
        value: count
    }));

    return pieChartData;
}