class Media {
  multitrack;
  waveform;
  video;

  isPlaying = false;
  onChangeHandlers = [];

  setMultitrack(mt) {
    this.multitrack = mt;
    const onChangeHandlers = this.onChangeHandlers;

    const handlePlayPause = () => {
      const time = this.getTime() * 10;
      const tracks = this.getVideoTracks();
      const isVideo = tracks.some((track) => (track.startPosition * 10 < time) && (time < (track.startPosition * 10 + track.duration * 10)));

      if (isVideo && this.isPlaying) {
        this.video.current?.play();
      } else {
        this.video.current?.pause();
      }
    }

    onChangeHandlers.push(handlePlayPause);

    this.multitrack = new Proxy(this.multitrack, {
      get(target, prop) {
        return target[prop];
      },

      set(target, prop, val) {
        target[prop] = val;
        for (const handler of onChangeHandlers) {
          handler();
        }
        return true;
      }
    })
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
    this.isPlaying = true;
  }

  pause() {
    this.multitrack?.pause();
    this.isPlaying = false;
  }

  getDuration() {
    return this.multitrack.maxDuration;
  }

  getTime() {
    return this.multitrack.getCurrentTime();
  }

  setTime(time) {
    this.multitrack?.setTime(time);

    const tracks = this.getVideoTracks();
    const previousTracks = tracks.filter((track) => track.startPosition < time);

    let videoTime = 0;
    for (const track of previousTracks) {
      if (track.startPosition < time && time < (track.startPosition + track.duration)) {
        videoTime += time - track.startPosition;
      } else {
        videoTime += track.duration;
      }
    }

    this.video.current.currentTime = videoTime;
  }

  onMultitrackChange(callback) {
    this.onChangeHandlers.push(callback);
  }
}

export const media = new Media();
