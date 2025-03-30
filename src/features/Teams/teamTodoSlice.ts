import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { TeamTodosInterface } from '@/utils/AppInterfaces';

interface TeamTodo {
    teamTodos: TeamTodosInterface[]
}

const initialState: TeamTodo = {
    teamTodos: []
}

export const teamTodoSlice = createSlice({
    name: 'teamTodos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TeamTodosInterface>) => {
            state.teamTodos.push(action.payload);
        },
    }
});

export const { addTodo } = teamTodoSlice.actions;

export const selectTeamTodos = (state: RootState) => state.teamTodo.teamTodos;

export default teamTodoSlice.reducer;