export const timelineHeight = 40;
export const trackHeight = 130;

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
    console.log(partId)
    wfElements[id].style.top = `${-((2 - partId - row) * trackHeight)}px`;
    console.log(`${-((3 - partId - row) * trackHeight)}px`)
  }
}
