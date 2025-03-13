import { Todos as TodoInterface } from "@/utils/AppInterfaces";

interface ChartDataInterface {
    month: string,
    taskCreated: number,
    taskCompleted: number
}

const getMonthsTillToday = (): string[] => {
    const allMonths: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentMonthIndex: number = new Date().getMonth();

    return allMonths.slice(0, currentMonthIndex + 1);
}

export const calculateChartData = (todos: TodoInterface[], completedTasks: TodoInterface[]): ChartDataInterface[] => {
    const months: string[] = getMonthsTillToday();
    const startDay: Date = new Date(new Date().getFullYear(), 0, 1);
    const currentDate: Date = new Date();

    const taskCreatedThisYear: TodoInterface[] = todos.filter(todo => {
        const allTaskCreationDate: Date = new Date(todo.task_created ?? "");

        return allTaskCreationDate >= startDay && allTaskCreationDate <= currentDate;
    });

    const taskCompletedThisYear: TodoInterface[] = completedTasks.filter(todo => {
        const allCompletedTaskDate: Date = new Date(todo.task_completed_date ?? "");

        return allCompletedTaskDate >= startDay && allCompletedTaskDate <= currentDate;
    });

    const monthWiseDate: ChartDataInterface[] = months.map(month => {
        const indexOfMonth: number = months.indexOf(month) + 1;

        const filteredCreatedDates: TodoInterface[] = taskCreatedThisYear.filter(task => {
            const taskCreatedDateMonth: number = new Date(task.task_created ?? "").getMonth() + 1;

            return taskCreatedDateMonth == indexOfMonth
        });

        const filteredCompletedDates: TodoInterface[] = taskCompletedThisYear.filter(task => {
            const taskCompletedDateMonth: number = new Date(task.task_completed_date ?? "").getMonth() + 1;

            return taskCompletedDateMonth == indexOfMonth
        });

        return {
            month,
            taskCreated: filteredCreatedDates.length,
            taskCompleted: filteredCompletedDates.length
        }
    });

    return monthWiseDate;
}