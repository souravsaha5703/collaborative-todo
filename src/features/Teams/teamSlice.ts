import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { Team as TeamInterface, TeamsInterface } from '@/utils/AppInterfaces';

interface Team {
    currentTeam: TeamInterface | null;
    allTeams: TeamsInterface[];
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
        }
    }
});

export const { addTeam, addAllTeams, updateTeam } = teamSlice.actions;

export const selectTeam = (state: RootState) => { state.team.currentTeam };

export default teamSlice.reducer;