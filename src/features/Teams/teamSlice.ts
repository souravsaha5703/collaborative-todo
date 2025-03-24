import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { Team as TeamInterface } from '@/utils/AppInterfaces';

interface Team {
    currentTeam: TeamInterface | null
}

const initialState: Team = {
    currentTeam: null
}

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        addTeam: (state, action: PayloadAction<TeamInterface | null>) => {
            state.currentTeam = action.payload;
        }
    }
});

export const { addTeam } = teamSlice.actions;

export const selectTeam = (state: RootState) => { state.team.currentTeam };

export default teamSlice.reducer;