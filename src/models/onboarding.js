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
    photoUpload: {
      text: "Кликните сюда чтобы загрузить фото",
      side: this.#side.bottom,
    },
    toolbarProjects: {
      text: "Здесь находятся ваши проекты Здесь находятся ваши проекты Здесь находятся ваши проекты Здесь находятся ваши проекты",
      side: this.#side.right,
    },
    toolbarPhoto: {
      text: "В этом разделе вы можете создать тифлокомментарий к фото",
      side: this.#side.right,
    },
    toolbarVideo: {
      text: "А тут - к видео",
      side: this.#side.right,
    },
    textEditor: {
      text: "Здесь будет отображаться текстовое описание избражения",
      side: this.#side.left,
    }
  }

  constructor() {
    this.photo = [];
    this.video = [];
  }

  pushPhoto(photo) {
    this.photo.push(photo);
  }

  pushVideo(video) {
    this.video.push(video);
  }

  showPhoto(i) {
    return this.photo[i];
  }
}

export const onboarding = new Onboarding();
