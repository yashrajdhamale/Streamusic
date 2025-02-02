import {createSlice} from '@reduxjs/toolkit';

const searchQuerySlice = createSlice({
    name: 'searchQuery',
    initialState: {
        value: '',
    },
    reducers: {
        setQuery: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {setQuery} = searchQuerySlice.actions;
export const searchQueryReducer = searchQuerySlice.reducer;