import {useEffect, useRef} from "react";
import {getWfElements, moveWfElements, splitWfElements} from "../../../models/waveform.js";
import {useProject} from "../../../hooks/useProject.js";

export const AudioEditor = () => {
  const waveform = useRef(null);
  const {project} = useProject();

  let multitrack;
  useEffect(() => {
    const audioParts = [
      {
        id: 0,
        draggable: true,
        startPosition: 0,
        url: project.comments[0].path,
        volume: 0.3,
        options: {
          waveColor: '#7A79FF',
        },
        isVideo: true,
      },
    ]

    multitrack = Multitrack.create(
      audioParts.reverse(),
      {
        container: waveform.current, // required!
        rightButtonDrag: false, // set to true to drag with right mouse button
        cursorWidth: 2,
        cursorColor: '#9421d7',
        trackBorderColor: '#466193',
        dragBounds: true,
      },
    )

  }, [project.comments]);

  const playPause = () => {
    multitrack.isPlaying() ? multitrack.pause() : multitrack.play()
  }

  useEffect(() => {
    const wfElements = getWfElements(waveform);
    const {wfVideos, wfVoices} = splitWfElements(wfElements);

    moveWfElements(wfVideos, true, 0);
    moveWfElements(wfVoices, false, 1);
  }, [])

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
