export interface User {
    id: string,
    fullname: string,
    status: boolean,
    email: string,
    emailVerification: boolean,
}

export interface AlertDialogError {
    title: string,
    description: string
}

export interface Todos {
    id: string,
    task: string,
    priority: string,
    tags: string[],
    task_status: boolean,
    createdBy: string | undefined,
    completion_date: string,
    task_completed_date?: string
} 