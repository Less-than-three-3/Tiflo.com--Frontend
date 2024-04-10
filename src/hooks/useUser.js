import {useDispatch, useSelector} from "react-redux";
import {dropUserAction, setUserAction} from "../store/userSlice.js";

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

  return {
    user,
    dropUser,
    setUser,
  }
}
