import {createSlice} from '@reduxjs/toolkit'

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    id: "",
    name: "New Project",
    media: "",
    text: "",
    comments: [],
  },

  reducers: {
    newProjectAction(state) {
      state.id = "";
      state.name = "New Project";
      state.media = "";
      state.text = "";
      state.comments = [];
    },

    setProjectIdAction(state, {payload}) {
      state.id = payload;
    },

    setProjectNameAction(state, {payload}) {
      state.name = payload;
    },

    setProjectMediaAction(state, {payload}) {
      state.media = payload;
    },

    setProjectTextAction(state, {payload}) {
      state.text = payload;
    },

    setProjectAudioAction(state, {payload}) {
      state.comments.push({
        path: payload.path,
        text: payload.text,
        start: payload.start,
      });
    },

    clearProjectAudioAction(state) {
      state.comments = [];
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
