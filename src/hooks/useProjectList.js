import {useDispatch, useSelector} from "react-redux";
import {clearProjectListAction, pushProjectAction, setProjectListAction} from "../store/projectListSlice.js";

export function useProjectList() {
  const projectList = useSelector((state) => {
    return state.projectListSlice;
  })

  const dispatch = useDispatch();

  const clearProjectList = () => {
    dispatch(clearProjectListAction());
  }

  const setProjectList = (value) => {
    dispatch(setProjectListAction(value));
  }

  const pushProject = (value) => {
    dispatch(pushProjectAction(value));
  }

  return {
    projectList,
    clearProjectList,
    setProjectList,
    pushProject,
  }
}
