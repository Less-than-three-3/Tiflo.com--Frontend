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
      order: 1,
      text: "Кликните сюда чтобы загрузить фото",
      side: this.#side.bottom,
    },
    toolbarProjects: {
      order:2,
      text: "Здесь находятся ваши проекты",
      side: this.#side.right,
    },
    toolbarPhoto: {
      order: 3,
      text: "В этом разделе вы можете создать тифлокомментарий к фото",
      side: this.#side.right,
    },
    toolbarVideo: {
      order: 4,
      text: "А тут - к видео",
      side: this.#side.right,
    },
    textEditor: {
      order: 5,
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
    console.log(photo)
    this.photo.push(photo);
    this.photo.sort((a, b) => a.data.order - b.data.order);
  }

  pushVideo(video) {
    this.video.push(video);
  }

  showPhoto(i) {
    return this.photo[i];
  }
}

export const onboarding = new Onboarding();
