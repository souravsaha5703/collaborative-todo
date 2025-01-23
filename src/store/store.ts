import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/Auth/authSlice';
import tagReducer from '@/features/Tags/tagSlice';
import todoReducer from '@/features/Todo/todoSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    tag: tagReducer,
    todo: todoReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch