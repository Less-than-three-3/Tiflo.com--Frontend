import {useDispatch, useSelector} from 'react-redux';
import {
  newProjectAction,
  setProjectTextAction,
  setProjectAudioAction,
  clearProjectAudioAction, setProjectAction
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

  const setProjectText = (value) => {
    dispatch(setProjectTextAction(value))
  }

  const setProjectAudio = (value) => {
    dispatch(setProjectAudioAction(value))
  }

  const clearProjectAudio = () => {
    dispatch(clearProjectAudioAction())
  }

  return {
    project,
    newProject,
    setProject,
    setProjectText,
    setProjectAudio,
    clearProjectAudio,
  }
}
