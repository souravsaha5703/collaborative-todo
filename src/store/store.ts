import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/Auth/authSlice';
import tagReducer from '@/features/Tags/tagSlice';
import todoReducer from '@/features/Todo/todoSlice';
import teamReducer from '@/features/Teams/teamSlice';
import listReducer from '@/features/Teams/listSlice';
import teamTodoReducer from '@/features/Teams/teamTodoSlice';
import memberReducer from '@/features/Teams/memberSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    tag: tagReducer,
    todo: todoReducer,
    team: teamReducer,
    list: listReducer,
    teamTodo: teamTodoReducer,
    member: memberReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch