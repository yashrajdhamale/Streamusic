import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    expiresAt: null,  // Add expiresAt to store the expiry time
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.expiresAt = action.payload.expiresAt;  // Store expiry time
    },
  },
});

const userauth = createSlice({
  name: "userauth",
  initialState: {
    userauth: false,
    UaccessToken: null
  },
  reducers:{
    setAuth: (state, action) =>{
      state.userauth = action.payload.userauth;
      state.UaccessToken = action.payload.UaccessToken;
    }
  }
});

export const { setToken } = authSlice.actions;
export const { setAuth } = userauth.actions;

export const authReducer = authSlice.reducer;
export const userauthReducer = userauth.reducer;