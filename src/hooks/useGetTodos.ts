import { useEffect } from "react";
import { database } from "@/Appwrite/appwriteConfig";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { addAllTodos } from "@/features/Todo/todoSlice";
import { Query } from "appwrite";
import { formatToIndianTime } from "@/utils/dateFormatter";
import { Todos } from "@/utils/AppInterfaces";

const useGetTodos = () => {
    const user = useAppSelector((state) => state.user.currentUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getTodos = async (id: string | undefined) => {

            if (id !== undefined) {
                const result = await database.listDocuments(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_TODOS_COLLECTION_ID,
                    [
                        Query.equal('createdBy', id),
                    ]
                );

                const allTodo: Todos[] = [];

                result.documents.forEach((todo) => {
                    allTodo.push({
                        id: todo.$id,
                        task: todo.task,
                        priority: todo.priority,
                        tags: todo.tags,
                        task_status: todo.task_status,
                        createdBy: todo.createdBy.$id,
                        completion_date: formatToIndianTime(todo.completion_date),
                        task_completed_date: todo.task_completed_date
                    });
                });

                dispatch(addAllTodos(allTodo));
            }
        }

        getTodos(user?.id);

    }, []);
}

export default useGetTodos;