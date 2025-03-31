import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { database } from "@/Appwrite/appwriteConfig";
import { Query, Models } from "appwrite";
import { Team as TeamInterface, Members } from "@/utils/AppInterfaces";
import { addTeam } from "@/features/Teams/teamSlice";
import { addMember } from "@/features/Teams/memberSlice";
import { storage } from "@/Appwrite/appwriteConfig";

const useGetTeamData = (teamId: string): void => {
    const user = useAppSelector((state) => state.user.currentUser);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchTeamInfo = async () => {
            if (teamId != "") {
                const teamData = await database.listDocuments(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_TEAMS_COLLECTION_ID,
                    [Query.equal('$id', teamId ?? "")]
                );

                const teamMembers: Members[] = [];

                teamData.documents[0].members.forEach((member: Models.Document) => {
                    const imageUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_PROFILE_IMAGE_BUCKET_ID, member.user_id.profileImage);
                    teamMembers.push({
                        id: member.$id,
                        team_id: teamId,
                        user_id: member.user_id.$id,
                        user_name: member.user_id.fullname,
                        user_email: member.user_id.email,
                        user_avatar: imageUrl,
                        joined_at: member.joined_at,
                        role: member.role
                    });
                    if (member.user_id.$id == user?.id) {
                        dispatch(addMember({
                            id: member.$id,
                            team_id: teamId,
                            user_id: member.user_id.$id,
                            user_name: member.user_id.fullname,
                            user_email: member.user_id.email,
                            user_avatar: imageUrl,
                            joined_at: member.joined_at,
                            role: member.role
                        }));
                    }
                });

                const teamObject: TeamInterface = {
                    id: teamData.documents[0].$id,
                    team_name: teamData.documents[0].team_name,
                    team_description: teamData.documents[0].team_description,
                    createdBy: teamData.documents[0].createdBy.$id,
                    invite_code: teamData.documents[0].invite_code,
                    members: teamMembers,
                    createdAt: teamData.documents[0].$createdAt
                }

                dispatch(addTeam(teamObject));
            }
        }

        fetchTeamInfo();
    }, [teamId]);
}

export default useGetTeamData;