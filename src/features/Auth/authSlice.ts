import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { User } from '@/utils/AppInterfaces';

interface ActiveUser {
    currentUser: User | null
}

const initialState: ActiveUser = {
    currentUser: null
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload
        }
    },
})

export const { addUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;

export default authSlice.reducer;