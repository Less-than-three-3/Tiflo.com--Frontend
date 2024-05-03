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
    console.log("updating audio", updateProject);
    if (media.waveform.current && media.waveform.current.querySelector("div")) {
      const domNode = media.waveform.current.querySelector("div");
      domNode.remove();
      console.log("node removed")
    }

    if (project && project.audioParts && project.audioParts.length > 0) {
      const audioParts = setAudioParts(project);
      audioParts.sort((a, b) => a.startPosition - b.startPosition);
      console.log("audioParts", audioParts);
      media.setMultitrack(createMultitrack(audioParts));
      console.log("multitrack", media.multitrack)

      const wfElements = getWfElements(audioParts);
      if (wfElements.length > 1) {
        const {wfVideos, wfVoices} = splitWfElements(wfElements, audioParts);

        moveWfElements(wfVideos, true, 0, audioParts);
        moveWfElements(wfVoices, false, 1, audioParts);
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
