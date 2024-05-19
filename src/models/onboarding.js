class Onboarding {
  photo = [];
  video = [];

  #side = {
    left: "left",
    right: "right",
    top: "top",
    bottom: "bottom",
  }

  data = {
    toolbarProjects: {
      order: 1,
      key: "TOOLBAR_PROJECTS",
      text: "Здесь находятся ваши проекты",
      side: this.#side.right,
    },
    toolbarPhoto: {
      order: 2,
      key: "TOOLBAR_PHOTO",
      text: "В этом разделе вы можете создать тифлокомментарий к фото",
      side: this.#side.right,
    },
    toolbarVideo: {
      order: 3,
      key: "TOOLBAR_VIDEO",
      text: "А тут - к видео",
      side: this.#side.right,
    },
    photoUpload: {
      order: 4,
      key: "PHOTO_UPLOAD",
      text: "Кликните сюда чтобы загрузить фото",
      side: this.#side.bottom,
    },
    textEditor: {
      order: 5,
      key: "TEXT_EDITOR",
      text: "Здесь будет отображаться текстовое описание избражения",
      side: this.#side.left,
    }
  }

  constructor() {
    this.photo = [];
    this.video = [];
  }

  clearOnboarding() {
    this.photo = [];
    this.video = [];
  }

  pushPhoto(photo) {
    if (!this.photo.find((item) => item.data.key === photo.data.key)) {
      this.photo.push(photo);
      this.photo.sort((a, b) => a.data.order - b.data.order);
    }
  }

  pushVideo(video) {
    if (!this.video.find((item) => item.data.key === video.data.key)) {
      this.video.push(video);
      this.video.sort((a, b) => a.data.order - b.data.order);
    }
  }

  getPhoto(i) {
    return this.photo[i];
  }

  getVideo(i) {
    return this.video[i];
  }
}

export const onboarding = new Onboarding();
