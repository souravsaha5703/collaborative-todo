import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { TeamTodosInterface } from '@/utils/AppInterfaces';
import { formatToIndianTime } from '@/utils/dateFormatter';

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
        addAllTodos: (state, action: PayloadAction<TeamTodosInterface[]>) => {
            state.teamTodos = action.payload;
        },
        updateTodo: (state, action: PayloadAction<TeamTodosInterface>) => {
            const updatedTodo = state.teamTodos.map(todo => todo.id === action.payload.id
                ? {
                    ...todo, task: action.payload.task,
                    task_due_date: action.payload.task_due_date,
                    priority: action.payload.priority,
                    task_status: action.payload.task_status,
                    createdBy: action.payload.createdBy,
                    list_id: action.payload.list_id,
                    assigned_to: action.payload.assigned_to,
                    task_updated_at: action.payload.task_updated_at,
                    task_created: action.payload.task_created
                }
                : todo
            );
            state.teamTodos = updatedTodo;
        },
        updateTodoStatus: (state, action: PayloadAction<string>) => {
            const updatedTodo = state.teamTodos.map(todo => todo.id === action.payload
                ? {
                    ...todo, task_status: true,
                    task_completed_date: formatToIndianTime(new Date())
                }
                : todo
            );
            state.teamTodos = updatedTodo;
        }
    }
});

export const { addTodo, addAllTodos, updateTodo, updateTodoStatus } = teamTodoSlice.actions;

export const selectTeamTodos = (state: RootState) => state.teamTodo.teamTodos;

export default teamTodoSlice.reducer;