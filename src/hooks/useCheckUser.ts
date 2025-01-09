import { useEffect, useState } from "react";
import { database } from "@/Appwrite/appwriteConfig";
import { Query } from "appwrite";

const useCheckUser = (email: string): { id: string, userExists: boolean } => {
    const [id, setId] = useState<string>('');
    const [userExists, setUserExists] = useState<boolean>(false);

    useEffect(() => {
        const findUser = async () => {
            try {
                const response = await database.listDocuments(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
                    [
                        Query.equal('email',email),
                    ]
                );

                if (response.documents.length > 0) {
                    setId(response.documents[0].$id);
                    setUserExists(true);
                } else {
                    setUserExists(false);
                }
            } catch (error) {
                console.error(error);
            }
        }

        findUser();
    }, [email]);

    return { id, userExists }
}

export default useCheckUser;