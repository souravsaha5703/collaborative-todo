import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { Members as MemberInterface } from '@/utils/AppInterfaces';

interface Member {
    currentMember: MemberInterface | null
}

const initialState: Member = {
    currentMember: null
}

export const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        addMember: (state, action: PayloadAction<MemberInterface | null>) => {
            state.currentMember = action.payload;
        }
    }
});

export const { addMember } = memberSlice.actions;

export const selectMember = (state: RootState) => { state.member.currentMember };

export default memberSlice.reducer;