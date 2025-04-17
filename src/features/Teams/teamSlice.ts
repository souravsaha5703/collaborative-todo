import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { Team as TeamInterface, TeamsInterface } from '@/utils/AppInterfaces';

interface Team {
    currentTeam: TeamInterface | null;
    allTeams: TeamsInterface[];
}

interface UpdatedTeamInfo {
    teamId: string;
    teamName: string;
    teamDesc: string;
}

const initialState: Team = {
    currentTeam: null,
    allTeams: []
}

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        addTeam: (state, action: PayloadAction<TeamInterface | null>) => {
            state.currentTeam = action.payload;
        },
        addAllTeams: (state, action: PayloadAction<TeamsInterface[]>) => {
            state.allTeams = action.payload;
        },
        updateTeam: (state, action: PayloadAction<string>) => {
            if (state.currentTeam) {
                state.currentTeam.members = state.currentTeam?.members.filter(memberInfo => memberInfo.id != action.payload);
            }
        },
        updateTeamInfo: (state, action: PayloadAction<UpdatedTeamInfo>) => {
            if (state.currentTeam) {
                state.currentTeam.team_name = action.payload.teamName;
                state.currentTeam.team_description = action.payload.teamDesc;
            }
            const updatedTeams = state.allTeams.map(team => team.id == action.payload.teamId
                ? {
                    ...team, team_name: action.payload.teamName,
                    team_description: action.payload.teamDesc
                }
                : team
            );
            if (state.allTeams) {
                state.allTeams = updatedTeams;
            }
        }
    }
});

export const { addTeam, addAllTeams, updateTeam, updateTeamInfo } = teamSlice.actions;

export const selectTeam = (state: RootState) => { state.team.currentTeam };

export default teamSlice.reducer;