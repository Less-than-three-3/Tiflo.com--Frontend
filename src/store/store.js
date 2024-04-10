import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import projectSlice from "./projectSlice.js";
import userSlice from "./userSlice.js";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  projectSlice,
  userSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
