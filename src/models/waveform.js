export const timelineHeight = 40;
export const trackHeight = 130;
//
// export const audioParts = [
//   {
//     id: 0,
//     draggable: true,
//     startPosition: 1,
//     url: '/src/assets/audio-part-1.mp3',
//     volume: 0.3,
//     options: {
//       waveColor: '#7A79FF',
//     },
//     isVideo: true,
//   },
//   {
//     id: 1,
//     draggable: true,
//     startPosition: 1,
//     url: '/src/assets/audio-part-2.mp3',
//     volume: 0.3,
//     options: {
//       waveColor: '#37C87A',
//     },
//     isVideo: false,
//   },
//   {
//     id: 2,
//     draggable: true,
//     startPosition: 10,
//     url: '/src/assets/audio-part-3.mp3',
//     volume: 0.3,
//     options: {
//       waveColor: '#37C87A',
//     },
//     isVideo: false,
//   },
//   {
//     id: 3,
//     draggable: true,
//     startPosition: 10, // start time relative to the entire multitrack
//     url: '/src/assets/audio-part-4.mp3',
//     volume: 0.3,
//     options: {
//       waveColor: '#7A79FF',
//     },
//     isVideo: true,
//   },
// ];

export const getWfElements = (waveform, audioParts) => {
  const wf = waveform.current;
  const wfOuterContainer = wf.querySelector("div")
  wfOuterContainer.style.height = `${timelineHeight + 2 * trackHeight}px`;
  wfOuterContainer.style.overflow = "hidden";

  const wfInnerContainer = wfOuterContainer.querySelector("div");
  wfInnerContainer.style.display = "flex";
  wfInnerContainer.style.flexDirection = "column-reverse";

  const allElements = wfInnerContainer.querySelectorAll(":scope > div");
  let wfElements = [];
  for (const id in allElements) {
    if (wfElements.length < audioParts.length && id % 2 === 1) {
      wfElements.push(allElements[id]);
    }
  }

  return wfElements;
}

export const splitWfElements = (wfElements, audioParts) => {
  const wfVideos = [];
  const wfVoices = [];
  for (const id in wfElements) {
    if (audioParts[id].isVideo === true) {
      wfVideos.push(wfElements[id]);
    } else {
      wfVoices.push(wfElements[id]);
    }
  }

  return {wfVideos: wfVideos, wfVoices: wfVoices};
}

export const moveWfElements = (wfElements, isVideo, row, audioParts) => {
  for (const id in wfElements) {
    const partId = audioParts.filter((i) => i.isVideo === isVideo)[id].id;
    wfElements[id].style.top = `${-((partId - row) * trackHeight)}px`;
  }
}
