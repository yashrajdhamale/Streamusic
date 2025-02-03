import { createSlice } from "@reduxjs/toolkit";

const userqueuecountSlice = createSlice({
    name: "userqueuecount",
    initialState: {
        userqueuecount: 0,
    },
    reducers: {
        setUserQueueCount: (state, action) => {
            state.userqueuecount = action.payload;
        },
    },
});

export const { setUserQueueCount } = userqueuecountSlice.actions;

export const userqueuecountReducer = userqueuecountSlice.reducer;