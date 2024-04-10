import {useDispatch, useSelector} from 'react-redux';
import {
  newProjectAction, setProjectAction,
  setProjectNameAction, setProjectMediaAction, setProjectTextAction
} from "../store/projectSlice.js";

export function useProject() {
  const project = useSelector((state) => {
    return state.projectSlice;
  })

  const dispatch = useDispatch();

  const newProject = () => {
    dispatch(newProjectAction());
  }

  const setProject = (value) => {
    dispatch(setProjectAction(value));
  }

  const setProjectName = (value) => {
    dispatch(setProjectNameAction(value))
  }

  const setProjectMedia = (value) => {
    dispatch(setProjectMediaAction(value))
  }

  const setProjectText = (value) => {
    dispatch(setProjectTextAction(value))
  }

  return {
    project,
    newProject,
    setProject,
    setProjectName,
    setProjectMedia,
    setProjectText,
  }
}
