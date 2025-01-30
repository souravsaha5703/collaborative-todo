import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { Todos } from '@/utils/AppInterfaces';
import { formatToIndianTime } from '@/utils/dateFormatter';

interface Todo {
    todos: Todos[]
}

const initialState: Todo = {
    todos: []
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todos>) => {
            state.todos.push(action.payload);
        },
        addAllTodos: (state, action: PayloadAction<Todos[]>) => {
            state.todos = action.payload;
        },
        updateTodo: (state, action: PayloadAction<Todos>) => {
            const updatedTodo = state.todos.map(todo => todo.id === action.payload.id
                ? {
                    ...todo, task: action.payload.task,
                    task_status: action.payload.task_status,
                    tags: action.payload.tags,
                    priority: action.payload.priority,
                    completion_date: action.payload.completion_date
                }
                : todo
            );
            state.todos = updatedTodo;
        },
        updateTodoStatus: (state, action: PayloadAction<string>) => {
            const updatedTodo = state.todos.map(todo => todo.id === action.payload
                ? {
                    ...todo, task_status: true,
                    task_completed_date: formatToIndianTime(new Date())
                }
                : todo
            );
            state.todos = updatedTodo;
        }
    }
});

export const { addTodo, addAllTodos, updateTodo, updateTodoStatus } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;