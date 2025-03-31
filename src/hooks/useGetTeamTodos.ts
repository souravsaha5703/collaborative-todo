import { useEffect } from "react";
import { database } from "@/Appwrite/appwriteConfig";
import { useAppDispatch } from "./redux-hooks";
import { addAllTodos } from "@/features/Teams/teamTodoSlice";
import { Query } from "appwrite";
import { formatToIndianTime } from "@/utils/dateFormatter";
import { TeamTodosInterface } from '@/utils/AppInterfaces';

const useGetTeamTodos = (list_id: string): void => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const getTodos = async () => {
            if (list_id != "") {
                const result = await database.listDocuments(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_TEAM_TODOS_COLLECTION_ID,
                    [
                        Query.equal('list_id', list_id),
                    ]
                );

                const allTodo: TeamTodosInterface[] = [];

                result.documents.forEach((todo) => {
                    allTodo.push({
                        assigned_to: {
                            id: todo.assigned_to.$id,
                            joined_at: formatToIndianTime(todo.assigned_to.joined_at),
                            role: todo.assigned_to.role,
                            team_id: todo.assigned_to.team_id,
                            user_email: todo.assigned_to.user_id.email,
                            user_id: todo.assigned_to.user_id.$id,
                            user_name: todo.assigned_to.user_id.fullname
                        },
                        createdBy: todo.createdBy.$id,
                        id: todo.$id,
                        list_id: {
                            createdAt: todo.list_id.$createdAt,
                            createdBy: todo.list_id.createdBy,
                            id: todo.list_id.$id,
                            list_name: todo.list_id.list_name,
                            team_id: todo.list_id.team_id
                        },
                        priority: todo.priority,
                        task: todo.task,
                        task_due_date: formatToIndianTime(todo.task_due_date),
                        task_status: todo.task_status,
                        task_completed_date: (todo.task_completed_date == null ? "" : formatToIndianTime(todo.task_completed_date)),
                        task_created: formatToIndianTime(todo.$createdAt),
                        task_updated_at: (todo.task_updated_at == null ? "" : formatToIndianTime(todo.task_updated_at))
                    });
                });

                dispatch(addAllTodos(allTodo));
            }
        }

        getTodos();
    }, [list_id]);
}

export default useGetTeamTodos;