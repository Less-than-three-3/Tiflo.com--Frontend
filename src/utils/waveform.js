import {media} from "../models/media.js";

export const timelineHeight = 40;
export const trackHeight = 130;

export const setAudioParts = (project) => {
  const audioParts = [];
  for (const id in project.audioParts) {
    audioParts.push({
      id: id,
      draggable: true,
      startPosition: project.audioParts[id].start / 10,
      duration: project.audioParts[id].duration / 10,
      url: import.meta.env.VITE_IS_DEPLOY === "true" ? `/media/${project.audioParts[id].path}` : project.audioParts[id].path,
      volume: 1,
      options: {
        waveColor: project.audioParts[id].text ? '#79ff8f' : '#7A79FF',
      },
      isVideo: project.audioParts[id].text.length === 0,
    })
  }

  return audioParts;
}

export const createMultitrack = (audioParts) => {
  return Multitrack.create(
    audioParts,
    {
      container: media.waveform.current, // required!
      rightButtonDrag: false, // set to true to drag with right mouse button
      cursorWidth: 2,
      cursorColor: '#9421d7',
      trackBorderColor: '#466193',
      dragBounds: true,
    },
  )
}

export const getWfElements = (audioParts) => {
  const wfOuterContainer = media.waveform.current.querySelector("div")
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

export const moveWfElements = (wfElements, row, audioParts) => {
  for (const id in wfElements) {
    wfElements[id].style.top = `${-((audioParts.length - 1 - id - row) * trackHeight)}px`;
  }
}
