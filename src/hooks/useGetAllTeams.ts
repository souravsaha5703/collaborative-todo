import { useEffect, useState } from "react";
import { database, storage } from "@/Appwrite/appwriteConfig";
import { useAppDispatch } from "./redux-hooks";
import { addAllTeams } from "@/features/Teams/teamSlice";
import { Query, Models } from "appwrite";
import { AvatarDetails, TeamsInterface } from "@/utils/AppInterfaces";

const useGetAllTeams = (userId: string): boolean => {
    const [teamExists, setTeamExists] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getTeams = async () => {
            if (userId != "") {
                const memberships = await database.listDocuments(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_MEMBERS_COLLECTION_ID,
                    [Query.equal('user_id', userId)]
                );

                if (memberships.documents.length > 0) {
                    setTeamExists(true);
                    const allTeams = memberships.documents.map(membership => membership.team_id);
                    const teamIds: string[] = [];
                    allTeams.forEach(team => {
                        teamIds.push(team.$id);
                    });

                    const queries = teamIds.map(id => Query.equal('$id', id));

                    if (teamIds.length > 0) {
                        const teamsData = await database.listDocuments(
                            import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                            import.meta.env.VITE_APPWRITE_TEAMS_COLLECTION_ID,
                            queries
                        );

                        let allTeams: TeamsInterface[] = [];

                        teamsData.documents.forEach(async (data) => {
                            let userRole = data.members.map((member: Models.Document) => member.user_id.$id == userId ? member.role : "");
                            let membersAvatarIds = data.members.map((member: Models.Document) => member.user_id.profileImage);
                            const membersAvatar: AvatarDetails[] = [];
                            membersAvatarIds.forEach((id: string) => {
                                const imageUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_PROFILE_IMAGE_BUCKET_ID, id);
                                membersAvatar.push({
                                    imageUrl: imageUrl
                                });
                            });
                            allTeams.push({
                                id: data.$id,
                                team_name: data.team_name,
                                team_description: data.team_description,
                                createdBy: data.createdBy,
                                invite_code: data.invite_code,
                                createdAt: data.$createdAt,
                                memberCount: data.members.length,
                                role: userRole,
                                avatars: membersAvatar
                            })
                        });

                        dispatch(addAllTeams(allTeams));
                    }
                } else {
                    setTeamExists(false);
                }
            }
        }

        getTeams();
    }, []);

    return teamExists;
}

export default useGetAllTeams;