import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/Auth/authSlice';
import tagReducer from '@/features/Tags/tagSlice';
import todoReducer from '@/features/Todo/todoSlice';
import teamReducer from '@/features/Teams/teamSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    tag: tagReducer,
    todo: todoReducer,
    team: teamReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch