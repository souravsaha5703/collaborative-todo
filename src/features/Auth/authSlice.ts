import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { User } from '@/utils/AppInterfaces';

interface ActiveUser {
    currentUser: User | null,
    status: boolean
}

const initialState: ActiveUser = {
    currentUser: null,
    status: false
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload
        },
        userStatus: (state, action: PayloadAction<boolean>) => {
            state.status = action.payload
        }
    },
})

export const { addUser, userStatus } = authSlice.actions;

export const selectUser = (state: RootState) => { state.user.currentUser, state.user.status };

export default authSlice.reducer;