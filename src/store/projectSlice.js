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

    // setProjectAction(state, {payload}) {
    //   console.log("payload", payload)
    //   state.id = payload.projectId;
    //   state.name = payload.name;
    //   state.media = payload.path;
    //   state.text = payload.text;
    // },

    setProjectIdAction(state, {payload}) {
      console.log("payload id", payload)
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
      console.log("payload audio", payload)
      state.comments.push({
        path: payload,
        text: "",
        start: 0,
      });
    }
  }
})

export const {
  newProjectAction,
  // setProjectAction,
  setProjectIdAction,
  setProjectNameAction,
  setProjectMediaAction,
  setProjectTextAction,
  setProjectAudioAction,
} = projectSlice.actions
export default projectSlice.reducer
