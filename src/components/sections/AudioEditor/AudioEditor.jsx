import {useEffect, useRef} from "react";
import {
  createMultitrack,
  getWfElements,
  moveWfElements,
  setAudioParts,
  splitWfElements
} from "../../../utils/waveform.js";
import {useProject} from "../../../hooks/useProject.js";

export const AudioEditor = ({multitrackRef, updateProject, play, setPlay}) => {
  const waveform = useRef(null);
  const {project} = useProject();

  // Use useRef due to assignments to the 'multitrack' variable from inside
  // React Hook useEffect will be lost after each render.
  // UseRef preserves value over time.
  useEffect(() => {
    if (waveform.current && waveform.current.querySelector("div")) {
      const domNode = waveform.current.querySelector("div");
      domNode.remove();
    }

    if (project && project.audioParts && project.audioParts.length > 0) {
      const audioParts = setAudioParts(project);
      multitrackRef.current = createMultitrack(waveform, audioParts);

      const wfElements = getWfElements(waveform, audioParts);
      if (wfElements.length > 1) {
        const {wfVideos, wfVoices} = splitWfElements(wfElements, audioParts);

        moveWfElements(wfVideos, true, 0, audioParts);
        moveWfElements(wfVoices, false, 1, audioParts);
      }
    }
  }, [updateProject]);

  useEffect(() => {
    if (play) {
      multitrackRef.current?.play();
    } else {
      multitrackRef.current?.pause();
    }
  }, [play, multitrackRef]);

  return (
    <>
      <div className="section grow w-full flex">
        <div className="w-16">
          <img src="/src/assets/icons/video_inactive.svg" alt="" className="w-10 mt-16"/>
          <img src="/src/assets/icons/text.svg" alt="" className="w-10 mt-24"/>
        </div>
        <div className="w-full h-full" id="waveform" ref={waveform}></div>
      </div>
    </>
  );
}
