import { database } from "@/Appwrite/appwriteConfig";
import { useEffect } from "react";
import { useAppDispatch } from "./redux-hooks";
import { addUser } from "@/features/Auth/authSlice";

const useCreateSession = (id: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const findUserAndCreateSession = async () => {
            try {
                if (id !== '') {
                    const response = await database.getDocument(
                        import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
                        id
                    );

                    dispatch(addUser({
                        id: response.documents[0].$id,
                        fullname: response.documents[0].fullname,
                        status: response.documents[0].status,
                        email: response.documents[0].email,
                        emailVerification: response.documents[0].emailVerification
                    }));
                }

            } catch (error) {
                console.error(error);
            }
        }
        findUserAndCreateSession();
    }, [id]);

}

export default useCreateSession;