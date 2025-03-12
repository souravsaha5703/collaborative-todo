import { Todos as TodoInterface } from "@/utils/AppInterfaces";

interface ChartData {
    name: string
    value: number
}

interface StatusData {
    completed: number
    incomplete: number
}

export const calculateTaskStatus = (todos: TodoInterface[]) => {
    const taskStatus: StatusData = {
        completed: 0,
        incomplete: 0
    }
    todos.forEach(todo => {
        if (todo.task_status == true) {
            taskStatus.completed = taskStatus.completed + 1;
        } else {
            taskStatus.incomplete = taskStatus.incomplete + 1;
        }
    });
    const pieChartDataForTaskStatus: ChartData[] = Object.entries(taskStatus).map(([status, count]) => ({
        name: status,
        value: count
    }));

    return pieChartDataForTaskStatus;
}