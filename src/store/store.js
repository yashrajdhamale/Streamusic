import { configureStore } from "@reduxjs/toolkit";
import { authReducer, userauthReducer } from "./authSlice.js";
import { searchQueryReducer } from "./searchQuerySlice.js";
import { loadingReducer } from "./loadingSlice.js";
import { changewindowReducer } from "./changewindowSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    userauth: userauthReducer,
    searchQuery: searchQueryReducer,
    loading: loadingReducer,
    changewindow: changewindowReducer,
  },
});

export default store;