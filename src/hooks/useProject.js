import {useDispatch, useSelector} from 'react-redux';
import {
  newProjectAction,
  setProjectNameAction,
  setProjectMediaAction,
  setProjectTextAction,
  setProjectIdAction,
  setProjectAudioAction,
  setProjectAudioArrAction, clearProjectAudioAction
} from "../store/projectSlice.js";

export function useProject() {
  const project = useSelector((state) => {
    return state.projectSlice;
  })

  const dispatch = useDispatch();

  const newProject = () => {
    dispatch(newProjectAction());
  }

  // const setProject = (value) => {
  //   dispatch(setProjectAction(value));
  // }

  const setProjectId = (value) => {
    dispatch(setProjectIdAction(value))
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

  const setProjectAudio = (value) => {
    dispatch(setProjectAudioAction(value))
  }

  const setProjectAudioArr = (value) => {
    dispatch(setProjectAudioArrAction(value))
  }

  const clearProjectAudio = () => {
    dispatch(clearProjectAudioAction())
  }

  return {
    project,
    newProject,
    // setProject,
    setProjectId,
    setProjectName,
    setProjectMedia,
    setProjectText,
    setProjectAudio,
    setProjectAudioArr,
    clearProjectAudio,
  }
}
