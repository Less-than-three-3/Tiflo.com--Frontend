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

    setProjectAction(state, {payload}) {
      state.projectId = payload.projectId;
      state.name = payload.name;
      state.path = payload.path;
      state.audioParts = payload.audioParts;
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
  setProjectAction,
  setProjectTextAction,
  setProjectAudioAction,
  clearProjectAudioAction,
} = projectSlice.actions
export default projectSlice.reducer
