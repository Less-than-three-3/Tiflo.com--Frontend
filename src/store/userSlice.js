import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: "",
    login: "",
    isLoggedIn: false,
  },

  reducers: {
    dropUserAction(state) {
      state.id = "";
      state.login = "";
      state.isLoggedIn = true;
    },

    setUserAction(state, {payload}) {
      state.id = payload.id;
      state.login = payload.login;
      state.isLoggedIn = true;
    },
  }
})

export const {
  dropUserAction,
  setUserAction,
} = userSlice.actions
export default userSlice.reducer
