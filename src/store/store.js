import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist';
import projectSlice from "./projectSlice.js";
import userSlice from "./userSlice.js";
import storage from "redux-persist/lib/storage";
import projectListSlice from "./projectListSlice.js";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  projectListSlice,
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

export const persistor = persistStore(store)
