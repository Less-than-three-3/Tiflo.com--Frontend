import {useCallback, useRef} from "react";
import {useWavesurfer} from '@wavesurfer/react'

export const AudioEditor = () => {
  const contaienrRef = useRef(null);

  const {wavesurfer, isPlaying} = useWavesurfer({
    container: contaienrRef,
    waveColor: '#4F4A85',
    progressColor: '#383351',
    url: '/src/assets/audio.mp3',
    cursorColor: "#fff",
    cursorWidth: 2,
  });

  wavesurfer?.on('interaction', () => {
    wavesurfer.play()
  })

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  return (
    <>
      <div className="section grow w-full">
        <div id="waveform" ref={contaienrRef}></div>
        <button onClick={onPlayPause} style={{minWidth: '5em'}}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  );
}
