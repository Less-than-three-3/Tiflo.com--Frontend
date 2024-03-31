import {useCallback, useEffect, useMemo, useRef} from "react";
import {useWavesurfer} from '@wavesurfer/react'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'
import MultiTrack from "wavesurfer-multitrack";

export const AudioEditor = () => {
  const contaienrRef = useRef(null);

  const {wavesurfer, isPlaying} = useWavesurfer({
    container: contaienrRef,
    waveColor: '#4F4A85',
    progressColor: '#383351',
    url: '/src/assets/audio.mp3',
    cursorColor: "#fff",
    cursorWidth: 2,
    plugins: useMemo(() => [Timeline.create()], []),
  });

  wavesurfer?.on('interaction', () => {
    wavesurfer.play()
  })

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  const wsRegions = wavesurfer?.registerPlugin(RegionsPlugin.create())

  wavesurfer?.on('decode', () => {
    // Regions
    wsRegions.addRegion({
      start: 9,
      end: 30,
      content: 'Tap & Resize & Drag',
      color: "rgba(117,6,255,0.49)",
      drag: true,
      resize: true,
    })

    wsRegions.addRegion({
      start: 46.5,
      content: 'Marker',
      color: "rgb(6,160,255)",
      drag: true,
      resize: true,
    })
  })

  let activeRegion = null
  wsRegions?.on('region-clicked', (region, e) => {
    e.stopPropagation() // prevent triggering a click on the waveform
    activeRegion = region
    region.play()
    region.setOptions({ color: "rgba(80,89,255,0.49)" })
  })

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
