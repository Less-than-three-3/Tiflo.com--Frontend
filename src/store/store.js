import {combineReducers, configureStore} from '@reduxjs/toolkit'
import projectSlice from "./projectSlice.js";

const projectReducer = combineReducers({
  projectSlice,
})

export const store = configureStore({
  reducer: {
    projectReducer,
  }
})
