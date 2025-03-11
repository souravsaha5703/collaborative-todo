import { Todos as TodoInterface } from "@/utils/AppInterfaces";

export const calculatePriorityCompletion = (completedTasks: TodoInterface[]): number => {

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