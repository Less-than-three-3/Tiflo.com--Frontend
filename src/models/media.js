class Media {
  multitrack;
  waveform;
  video;
  isPlaying = false;

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
    const time = this.getTime() * 10;
    const tracks = this.getVideoTracks();
    const isVideo = tracks.some((track) => (track.startPosition * 10 <= time) && (time <= (track.startPosition * 10 + track.duration)));

    if (isVideo) {
      this.video.current?.play();
    }
    this.isPlaying = true;
    this.multitrack?.play();
  }

  pause() {
    this.isPlaying = false;
    this.multitrack?.pause();
    this.video.current?.pause();
  }

  getDuration() {
    return this.multitrack.maxDuration;
  }

  getTime() {
    return this.multitrack.getCurrentTime();
  }

  setTime(time) {
    this.multitrack?.setTime(time);
    this.video.current.currentTime = time;
  }

  onMultitrackChange(callback) {
    let lastTimestamp = this.getTime() * 10;
    setInterval(() => {
      const time = this.getTime() * 10;
      if (time > lastTimestamp) {
        const tracks = this.getVideoTracks();
        const isVideo = tracks.some((track) => (track.startPosition * 10 < time) && (time < (track.startPosition * 10 + track.duration)));

        if (isVideo && this.isPlaying) {
          this.video.current?.play();
        } else {
          this.video.current?.pause();
        }
      }
      lastTimestamp = time;

      callback();
    }, 100)
  }
}

export const media = new Media();
