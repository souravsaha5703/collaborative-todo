import { Todos as TodoInterface } from "@/utils/AppInterfaces";

export const calculateTimeEfficiency = (completedTasks: TodoInterface[]): number => {

    let timeEfficiencyRatioOfAllTasks: number[] = [];
    completedTasks.forEach(task => {
        let estimatedTime: Date = new Date(task.completion_date);
        let actualCompletedTime: Date = new Date(task.task_completed_date ?? "");

        timeEfficiencyRatioOfAllTasks.push(estimatedTime.getTime() / actualCompletedTime.getTime());
    });

    let sumOfTimeEfficiencyRatio: number = 0;
    timeEfficiencyRatioOfAllTasks.forEach(time => {
        sumOfTimeEfficiencyRatio = sumOfTimeEfficiencyRatio + time;
    });

    let avgTimeEfficiencyRatio: number = sumOfTimeEfficiencyRatio / completedTasks.length;

    let timeEfficiencyPoints: number = 0;

    if (avgTimeEfficiencyRatio > 1) {
        timeEfficiencyPoints = 100;
    } else if (avgTimeEfficiencyRatio == 1) {
        timeEfficiencyPoints = 50;
    } else {
        timeEfficiencyPoints = 25;
    }

    return timeEfficiencyPoints;
}