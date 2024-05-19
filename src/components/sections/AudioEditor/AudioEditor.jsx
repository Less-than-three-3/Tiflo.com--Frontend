import {useEffect, useRef, useState} from "react";
import {
  createMultitrack,
  getWfElements,
  moveWfElements,
  setAudioParts,
} from "../../../utils/waveform.js";
import {useProject} from "../../../hooks/useProject.js";
import {media} from "../../../models/media.js";
import {useParams} from "react-router-dom";
import {Loader} from "../../UI/Loader/Loader.jsx";

export const AudioEditor = ({loadingComment}) => {
  const {project} = useProject();
  const params = useParams();

  media.setWaveform(useRef(null));

  useEffect(() => {
    if (media.waveform.current && media.waveform.current.querySelector("div") && !loadingComment) {
      const domNode = media.waveform.current.querySelector("div");
      domNode.remove();
    }

    if (project && project.audioParts && project.audioParts.length > 0 && !loadingComment) {
      const audioParts = setAudioParts(project);
      audioParts.sort((a, b) => a.startPosition - b.startPosition);
      media.setMultitrack(createMultitrack(audioParts));

      const wfElements = getWfElements(audioParts);
      moveWfElements(wfElements, audioParts);

      media.waveform.current.addEventListener("click", () => {
        media.setTime(media.getAudioTime());
      })
    }
  }, [project, params, loadingComment]);

  return (
    <>
      <div className="section grow w-full flex">
        <div className="w-16">
          <img src="/src/assets/icons/video_inactive.svg" alt="" className="w-10 mt-16"/>
          <img src="/src/assets/icons/text.svg" alt="" className="w-10 mt-24"/>
        </div>
        <div className={`${loadingComment ? "hidden" : "block"} w-full h-full`} id="waveform"
             ref={media.waveform}/>

        {loadingComment &&
          <Loader/>
        }
      </div>
    </>
  );
}
