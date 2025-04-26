import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { List as ListInterface } from '@/utils/AppInterfaces';

interface List {
    lists: ListInterface[]
}

interface UpdateList {
    listId: string;
    listName: string;
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
        },
        updateList: (state, action: PayloadAction<UpdateList>) => {
            if (state.lists) {
                const updatedInfo: ListInterface[] = state.lists.map(list => list.id == action.payload.listId
                    ? {
                        ...list, list_name: action.payload.listName
                    }
                    : list
                );
                state.lists = updatedInfo;
            }
        }
    }
});

export const { addAllList, addList, updateList } = listSlice.actions;

export const selectList = (state: RootState) => { state.list.lists };

export default listSlice.reducer;