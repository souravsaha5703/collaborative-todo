import { useEffect, useState } from "react";
import { account } from "@/Appwrite/appwriteConfig";
import { User } from "@/utils/AppInterfaces";

const useAuth = (): { user: User | null } => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await account.get();

                setUser({
                    id: response.$id,
                    fullname: response.name,
                    status: response.status,
                    email: response.email,
                    emailVerification: response.emailVerification
                });

            } catch (error) {
                setUser(null);
                console.error(error);
            }
        }

        checkUser();
    }, []);

    return { user }
}

export default useAuth;