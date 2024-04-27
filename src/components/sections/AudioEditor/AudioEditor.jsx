import {useEffect, useRef} from "react";
import {getWfElements, moveWfElements, splitWfElements} from "../../../models/waveform.js";
import {useProject} from "../../../hooks/useProject.js";

export const AudioEditor = ({updateProject, setPlay}) => {
  const waveform = useRef(null);
  const {project} = useProject();

  let multitrack;
  useEffect(() => {
    if (waveform.current && waveform.current.querySelector("div")) {
      const domNode = waveform.current.querySelector("div");
      domNode.remove();
    }

    if (project && project.audioParts && project.audioParts.length > 0) {
      let audioParts = [];
      for (const id in project.audioParts) {
        const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/i;
        const path = project.audioParts[id].path;
        const uuid = path.match(uuidRegex);

        let format = "wav";
        let fileFormat = project.audioParts[id].path.split(".")[1];
        if (fileFormat) {
          format = fileFormat
        }

        audioParts.push({
          id: id,
          draggable: true,
          startPosition: project.audioParts[id].start,
          url: `/media/${uuid}.${format}`,
          volume: 1,
          options: {
            waveColor: project.audioParts[id].text ? '#79ff8f' : '#7A79FF',
          },
          isVideo: project.audioParts[id].text.length === 0,
        })
      }

      console.log("audioParts", audioParts);

      multitrack = Multitrack.create(
        audioParts,
        {
          container: waveform.current, // required!
          rightButtonDrag: false, // set to true to drag with right mouse button
          cursorWidth: 2,
          cursorColor: '#9421d7',
          trackBorderColor: '#466193',
          dragBounds: true,
        },
      )

      console.log("multitrack", multitrack)
      const wfElements = getWfElements(waveform, audioParts);
      console.log("wfElements", wfElements)
      if (wfElements.length > 1) {
        const {wfVideos, wfVoices} = splitWfElements(wfElements, audioParts);

        moveWfElements(wfVideos, true, 0, audioParts);
        moveWfElements(wfVoices, false, 1, audioParts);
      }
    }
  }, [updateProject]);

  const playPause = () => {
    multitrack.isPlaying() ? multitrack.pause() : multitrack.play()
  }

  return (
    <>
      <div className="section grow w-full flex">
        <div className="w-16">
          <button onClick={playPause}>play</button>
          <img src="/src/assets/icons/video_inactive.svg" alt="" className="w-10 mt-10"/>
          <img src="/src/assets/icons/text.svg" alt="" className="w-10 mt-24"/>
        </div>
        <div className="w-full h-full" id="waveform" ref={waveform}></div>
      </div>
    </>
  );
}
