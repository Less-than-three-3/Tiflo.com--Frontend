import {createSlice} from '@reduxjs/toolkit'

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projectId: "",
    name: "New Project",
    path: "",
    audioParts: [],
  },

  reducers: {
    newProjectAction(state) {
      state.projectId = "";
      state.name = "New Project";
      state.path = "";
      state.audioParts = [];
    },

    setProjectIdAction(state, {payload}) {
      state.projectId = payload;
    },

    setProjectNameAction(state, {payload}) {
      state.name = payload;
    },

    setProjectPathAction(state, {payload}) {
      state.path = payload;
    },

    setProjectAudioAction(state, {payload}) {
      state.comments.push({
        path: payload.path,
        text: payload.text,
        start: payload.start,
      });
    },

    clearProjectAudioAction(state) {
      state.audioParts = [];
    },
  }
})

export const {
  newProjectAction,
  setProjectIdAction,
  setProjectNameAction,
  setProjectMediaAction,
  setProjectTextAction,
  setProjectAudioAction,
  clearProjectAudioAction,
} = projectSlice.actions
export default projectSlice.reducer
