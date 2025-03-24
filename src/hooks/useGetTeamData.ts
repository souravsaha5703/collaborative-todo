import { useEffect } from "react";
import { useAppDispatch } from "./redux-hooks";
import { database } from "@/Appwrite/appwriteConfig";
import { Query, Models } from "appwrite";
import { Team as TeamInterface, Members } from "@/utils/AppInterfaces";
import { addTeam } from "@/features/Teams/teamSlice";

const useGetTeamData = (teamId: string | undefined) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchTeamInfo = async () => {
            if (teamId) {
                const teamData = await database.listDocuments(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_TEAMS_COLLECTION_ID,
                    [Query.equal('$id', teamId ?? "")]
                );

                const teamMembers: Members[] = [];

                teamData.documents[0].members.forEach((member: Models.Document) => {
                    teamMembers.push({
                        id: member.$id,
                        team_id: teamId,
                        user_id: member.user_id.$id,
                        joined_at: member.joined_at,
                        role: member.role
                    });
                });

                const teamObject: TeamInterface = {
                    id: teamData.documents[0].$id,
                    team_name: teamData.documents[0].team_name,
                    team_description: teamData.documents[0].team_description,
                    createdBy: teamData.documents[0].createdBy.$id,
                    invite_code: teamData.documents[0].invite_code,
                    members: teamMembers
                }

                dispatch(addTeam(teamObject));
            }
        }

        fetchTeamInfo();
    }, [teamId]);
}

export default useGetTeamData;