class Media {
  multitrack;
  waveform;
  video;

  setMultitrack(mt) {
    this.multitrack = mt;
  }

  setWaveform(wf) {
    this.waveform = wf;
  }

  setVideo(video) {
    this.video = video;
  }

  getTracks() {
    return this.multitrack.tracks.filter((track) => track.id !== "placeholder");
  }

  getVideoTracks() {
    return this.getTracks().filter((track) => track.isVideo)
  }

  getCommentTracks() {
    return this.getTracks().filter((track) => !track.isVideo)
  }

  setTrackPosition(track, start) {
    track.startPosition = start;
  }

  play() {
    this.multitrack?.play();
    this.video.current?.play();
  }

  pause() {
    this.multitrack?.pause();
    this.video.current?.pause();
  }

  isPlaying() {
    console.log(this.multitrack?.isPlaying())
    return this.multitrack?.isPlaying();
  }

  setTime(time) {
    this.multitrack?.setTime(time);
    this.video.current.currentTime = time;
  }
}

export const media = new Media();
