import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/Auth/authSlice';
import tagReducer from '@/features/Tags/tagSlice';

export const store = configureStore({
  reducer: {
    user:authReducer,
    tag:tagReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch