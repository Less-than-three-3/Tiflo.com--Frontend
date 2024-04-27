import {createSlice} from '@reduxjs/toolkit'

const projectListSlice = createSlice({
  name: 'projectList',
  initialState: [],

  reducers: {
    clearProjectListAction(state) {
      state.length = 0;
    },

    setProjectListAction(state, {payload}) {
      state.length = 0;
      state.push(...payload);
    },

    pushProjectAction(state, {payload}) {
      state.push(payload);
    }
  }
})

export const {
  clearProjectListAction,
  setProjectListAction,
  pushProjectAction,
} = projectListSlice.actions
export default projectListSlice.reducer