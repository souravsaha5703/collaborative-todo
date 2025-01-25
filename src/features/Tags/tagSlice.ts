import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

interface Tags {
    tags: string[]
}

const initialState: Tags = {
    tags: []
}

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        addTag: (state, action: PayloadAction<string>) => {
            state.tags.push(action.payload);
        },
        addAllTags: (state, action: PayloadAction<string[]>) => {
            state.tags = action.payload
        },
        removeTag: (state, action: PayloadAction<string>) => {
            const filterTag = state.tags.filter(tag => tag !== action.payload);
            state.tags = filterTag;
        },
        removeAllTags: (state) => {
            state.tags = [];
        }
    }
});

export const { addTag, removeTag, removeAllTags, addAllTags } = tagSlice.actions;

export const selectTag = (state: RootState) => state.tag.tags;

export default tagSlice.reducer;