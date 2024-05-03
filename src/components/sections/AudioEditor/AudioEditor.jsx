import {useEffect, useRef} from "react";
import {
  createMultitrack,
  getWfElements,
  moveWfElements,
  setAudioParts,
  splitWfElements
} from "../../../utils/waveform.js";
import {useProject} from "../../../hooks/useProject.js";
import {media} from "../../../models/media.js";

export const AudioEditor = ({updateProject}) => {
  const {project} = useProject();
  media.setWaveform(useRef(null));

  useEffect(() => {
    if (media.waveform.current && media.waveform.current.querySelector("div")) {
      const domNode = media.waveform.current.querySelector("div");
      domNode.remove();
    }

    if (project && project.audioParts && project.audioParts.length > 0) {
      const audioParts = setAudioParts(project);
      audioParts.sort((a, b) => a.startPosition - b.startPosition);
      media.setMultitrack(createMultitrack(audioParts));

      const wfElements = getWfElements(audioParts);
      if (wfElements.length > 1) {
        const {wfVideos, wfVoices} = splitWfElements(wfElements, audioParts);

        moveWfElements(wfVideos, 0, audioParts);
        moveWfElements(wfVoices, 1, audioParts);
      }

      media.waveform.current.addEventListener("click", () => {
        media.setTime(media.getTime());
      })
    }
  }, [updateProject]);

  return (
    <>
      <div className="section grow w-full flex">
        <div className="w-16">
          <img src="/src/assets/icons/video_inactive.svg" alt="" className="w-10 mt-16"/>
          <img src="/src/assets/icons/text.svg" alt="" className="w-10 mt-24"/>
        </div>
        <div className="w-full h-full" id="waveform" ref={media.waveform}></div>
      </div>
    </>
  );
}
