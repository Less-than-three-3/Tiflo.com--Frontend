import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: "",
    login: "",
    isLoggedIn: false,
  },

  reducers: {
    dropUserAction(state) {
      state.id = "";
      state.login = "";
      state.isLoggedIn = false;
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
