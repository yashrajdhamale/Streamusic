import {createSlice} from "@reduxjs/toolkit";

const changewindowSlice = createSlice({
    name: 'changewindow',
    initialState: {
        changewindow: false,
    },
    reducers: {
        setWindow: (state, action) => {
            state.changewindow = action.payload;
        },
    },
});

export const {setWindow} = changewindowSlice.actions;
export const changewindowReducer = changewindowSlice.reducer;