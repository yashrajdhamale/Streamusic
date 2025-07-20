import { createSlice } from "@reduxjs/toolkit";

const SelectedSongs = createSlice({
  name: "SelectedSongs",
  initialState: {
    songs: [],
  },
  reducers: {
    setSelectedSongs: (state, action) => {
      state.songs = action.payload;
    },
    removeSong: (state, action) => {
      const songIdToRemove = action.payload;
      state.songs = state.songs.filter((song) => song.id !== songIdToRemove);
    },
    clearSelectedSongs: (state) => {
      state.songs = [];
    },
  },
});

export const { setSelectedSongs, removeSong, clearSelectedSongs } =
  SelectedSongs.actions; //

export const SelectedSongsReducer = SelectedSongs.reducer; //reducer function to add into the reducer store
