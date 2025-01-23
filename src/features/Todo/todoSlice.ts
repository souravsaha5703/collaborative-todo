import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { Todos } from '@/utils/AppInterfaces';

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
        }
    }
});

export const { addTodo,addAllTodos } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;