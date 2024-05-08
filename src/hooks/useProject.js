import {useDispatch, useSelector} from 'react-redux';
import {
  newProjectAction,
  updateProjectAudioAction,
  setProjectAudioAction,
  setProjectAction,
  clearProjectAction
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

  const updateProjectAudio = (value) => {
    dispatch(updateProjectAudioAction(value))
  }

  const setProjectAudio = (value) => {
    dispatch(setProjectAudioAction(value))
  }

  const clearProject = () => {
    dispatch(clearProjectAction())
  }

  return {
    project,
    newProject,
    setProject,
    updateProjectAudio,
    setProjectAudio,
    clearProject,
  }
}
