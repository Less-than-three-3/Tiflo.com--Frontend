import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: "",
    login: "",
    isLoggedIn: false,
    showOnboarding: {
      photo: true,
      video: true,
    }
  },

  reducers: {
    dropUserAction(state) {
      state.userId = "";
      state.login = "";
      state.isLoggedIn = false;
    },

    setUserAction(state, {payload}) {
      state.userId = payload.id;
      state.login = payload.login;
      state.isLoggedIn = true;
    },

    openOnboardingAction(state) {
      state.showOnboarding.photo = true;
      state.showOnboarding.video = true;
    },

    closePhotoOnboardingAction(state) {
      state.showOnboarding.photo = false;
    },

    closeVideoOnboardingAction(state) {
      state.showOnboarding.video = false;
    }
  }
})

export const {
  dropUserAction,
  setUserAction,
  openOnboardingAction,
  closePhotoOnboardingAction,
  closeVideoOnboardingAction,
} = userSlice.actions
export default userSlice.reducer
