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

    setProjectAction(state, {payload}) {
      console.log("payload", payload)
      state.id = payload.projectId;
      state.name = payload.name;
      state.media = payload.path;
      state.text = payload.text;
      state.comments = payload.comments;
    },

    setProjectNameAction(state, {payload}) {
      state.name = payload;
    },

    setProjectMediaAction(state, {payload}) {
      state.id = "0";
      state.media = payload;
    },

    setProjectTextAction(state, {payload}) {
      state.text = payload;
    }
  }
})

export const {
  newProjectAction,
  setProjectAction,
  setProjectNameAction,
  setProjectMediaAction,
  setProjectTextAction
} = projectSlice.actions
export default projectSlice.reducer
