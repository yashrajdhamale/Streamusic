import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
    name: "dialog",
    initialState: {
        open: true,
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
    },
});

export const { setOpen } = dialogSlice.actions;

export const dialogReducer = dialogSlice.reducer;