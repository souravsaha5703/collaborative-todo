import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { List as ListInterface } from '@/utils/AppInterfaces';

interface List {
    lists: ListInterface[]
}

const initialState: List = {
    lists: []
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addAllList: (state, action: PayloadAction<ListInterface[]>) => {
            state.lists = action.payload;
        },
        addList: (state, action: PayloadAction<ListInterface>) => {
            state.lists.push(action.payload);
        }
    }
});

export const { addAllList, addList } = listSlice.actions;

export const selectList = (state: RootState) => { state.list.lists };

export default listSlice.reducer;