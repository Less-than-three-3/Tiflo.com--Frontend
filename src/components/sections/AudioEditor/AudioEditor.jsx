import {useCallback, useEffect, useMemo, useRef} from "react";
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js'
import WaveSurfer from "wavesurfer.js";

export const AudioEditor = () => {
  const waveform = useRef(null);
  const waveform2 = useRef(null);

  useEffect(() => {
    const multitrack = Multitrack.create(
      [
        {
          id: 0,
          draggable: true,
          startPosition: 1, // start time relative to the entire multitrack
          url: '/src/assets/audio.mp3',
          volume: 0.3,

        },
        {
          id: 1,
          draggable: true,
          startPosition: 1, // start time relative to the entire multitrack
          url: '/src/assets/audio.mp3',
          volume: 0.3,
        },
        {
          id: 2,
          draggable: true,
          startPosition: 100, // start time relative to the entire multitrack
          url: '/src/assets/audio.mp3',
          volume: 0.3,
        },
      ],
      {
        container: waveform.current, // required!
        rightButtonDrag: false, // set to true to drag with right mouse button
        cursorWidth: 2,
        cursorColor: '#9421d7',
        trackBackground: '#2D2D2D',
        trackBorderColor: '#466193',
        dragBounds: true,
      },
    )

    // Play/pause button
    const button = document.querySelector('#play')
    multitrack.once('canplay', () => {
      button.disabled = false
      button.onclick = () => {
        multitrack.isPlaying() ? multitrack.pause() : multitrack.play()
        button.textContent = multitrack.isPlaying() ? 'Pause' : 'Play'
      }
    })

  }, []);

  return (
    <>
      <div className="section grow w-full">
        <div id="waveform" ref={waveform}></div>
        <button id="play">play</button>
      </div>
    </>
  );
}
