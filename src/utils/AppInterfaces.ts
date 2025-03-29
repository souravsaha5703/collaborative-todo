export interface User {
    id: string;
    fullname: string;
    status: boolean;
    email: string;
    emailVerification: boolean;
}

export interface AlertDialogError {
    title: string;
    description: string;
}

export interface Todos {
    id: string;
    task: string;
    priority: string;
    tags: string[];
    task_status: boolean;
    createdBy: string | undefined;
    completion_date: string;
    task_completed_date?: string;
    task_created?: string
}

export interface Members {
    id: string;
    team_id: string;
    role: string;
    joined_at: string;
    user_id: string;
    user_name: string;
    user_email: string;
    user_avatar: string;
}

export interface Team {
    id: string;
    team_name: string;
    team_description: string;
    createdBy: string;
    invite_code: string;
    members: Members[];
    createdAt: string;
}

export interface List {
    id: string;
    list_name: string;
    team_id: string;
    createdBy: string;
    createdAt: string;
}

export interface AvatarDetails {
    imageUrl: string;
}

export interface TeamsInterface {
    id: string;
    team_name: string;
    team_description: string;
    createdBy: string;
    invite_code: string;
    createdAt: string;
    memberCount: number;
    role: string;
    avatars: AvatarDetails[];
}