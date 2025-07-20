import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';

import { authReducer, userauthReducer } from "./authSlice.js";
import { searchQueryReducer } from "./searchQuerySlice.js";
import { loadingReducer } from "./loadingSlice.js";
import { changewindowReducer } from "./changewindowSlice.js";
import { userqueuecountReducer } from "./usercountSlice.js";
import { dialogReducer } from "./dialogSlice.js";
import { SelectedSongsReducer } from "./selectedsongsSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  userauth: userauthReducer,
  searchQuery: searchQueryReducer,
  loading: loadingReducer,
  changewindow: changewindowReducer,
  userqueuecount: userqueuecountReducer,
  dialog: dialogReducer,
  selectedSongs: SelectedSongsReducer, 
});

const persistConfig = {
  key: 'root',
  storage: storageSession, // or use 'redux-persist/lib/storage' for localStorage
  whitelist: ['selectedSongs'], // Only persist this slice
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});


export const persistor = persistStore(store);

export default store;
