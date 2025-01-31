import { configureStore } from "@reduxjs/toolkit";
import { authReducer, userauthReducer } from "./authSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userauth: userauthReducer,
  },
});

export default store;