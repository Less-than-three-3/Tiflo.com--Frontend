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
      state.audioParts = [];
      state.audioParts.push(...payload);
    },

    updateProjectAudioAction(state, {payload}) {
      if (state.audioParts) {
        const index = state.audioParts.findIndex(part => part.partId === payload.partId);
        if (index !== -1) {
          state.audioParts[index] = payload;
        }
      }
    }
  }
})

export const {
  newProjectAction,
  setProjectAction,
  setProjectAudioAction,
  updateProjectAudioAction,
} = projectSlice.actions
export default projectSlice.reducer
