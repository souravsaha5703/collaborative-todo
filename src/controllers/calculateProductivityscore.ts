import { Todos as TodoInterface } from "@/utils/AppInterfaces";

const calculatePriorityCompletion = (completedTasks: TodoInterface[]): number => {

    let allTasksPriorityPoints: number[] = [];
    completedTasks.forEach(task => {
        if (task.priority == "1st") {
            allTasksPriorityPoints.push(100);
        } else if (task.priority == "2nd") {
            allTasksPriorityPoints.push(80);
        } else {
            allTasksPriorityPoints.push(50);
        }
    });

    let sumofPriorityPoints: number = 0;

    allTasksPriorityPoints.forEach(priorityPoints => {
        sumofPriorityPoints = sumofPriorityPoints + priorityPoints;
    });

    let avgTaskPriorityPoint = sumofPriorityPoints / completedTasks.length;

    return avgTaskPriorityPoint;
}

const calculateTimeEfficiency = (completedTasks: TodoInterface[]): number => {

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

export const calculateProductivityScore = (taskCompletionRate: string, onTimeTaskCompletionRate: string, inCompleteTasks: TodoInterface[], completedTasks: TodoInterface[]) => {
    const timeEfficiency = calculateTimeEfficiency(completedTasks);
    const priorityCompletion = calculatePriorityCompletion(completedTasks);

    let completionScore: number = Number(taskCompletionRate) * 0.40;
    let onTimeCompletionScore: number = Number(onTimeTaskCompletionRate) * 0.20;
    let timeEfficiencyScore: number = timeEfficiency * 0.20;
    let priorityCompletionScore: number = priorityCompletion * 0.10;
    let overDueScore: number = inCompleteTasks.length * 0.10;

    return completionScore + onTimeCompletionScore + timeEfficiencyScore + priorityCompletionScore + overDueScore;
}