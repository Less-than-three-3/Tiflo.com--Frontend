import {useDispatch, useSelector} from "react-redux";
import {
  closePhotoOnboardingAction,
  closeVideoOnboardingAction,
  dropUserAction, openOnboardingAction,
  setUserAction
} from "../store/userSlice.js";

export function useUser() {
  const user = useSelector((state) => {
    return state.userSlice;
  })

  const dispatch = useDispatch();

  const dropUser = () => {
    dispatch(dropUserAction());
  }

  const setUser = (value) => {
    dispatch(setUserAction(value));
  }

  const openOnboarding = () => {
    dispatch(openOnboardingAction());
  }

  const closePhotoOnboarding = () => {
    dispatch(closePhotoOnboardingAction());
  }

  const closeVideoOnboarding = () => {
    dispatch(closeVideoOnboardingAction());
  }

  return {
    user,
    dropUser,
    setUser,
    openOnboarding,
    closePhotoOnboarding,
    closeVideoOnboarding,
  }
}
