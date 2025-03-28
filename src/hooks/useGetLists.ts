import { useEffect } from "react";
import { database } from "@/Appwrite/appwriteConfig";
import { useAppDispatch } from "./redux-hooks";
import { addAllList } from "@/features/Teams/listSlice";
import { Query } from "appwrite";
import { List } from "@/utils/AppInterfaces";

const useGetLists = (teamId: string): void => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchLists = async () => {
            if (teamId != "") {
                const listsData = await database.listDocuments(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_LISTS_COLLECTION_ID,
                    [Query.equal('team_id', teamId)]
                );

                let allLists: List[] = [];
                listsData.documents.forEach((data) => {
                    allLists.push({
                        id: data.$id,
                        list_name: data.list_name,
                        team_id: data.team_id,
                        createdBy: data.createdBy,
                        createdAt: data.$createdAt
                    });
                });

                dispatch(addAllList(allLists));
            }
        }

        fetchLists();
    }, [teamId]);
}

export default useGetLists;