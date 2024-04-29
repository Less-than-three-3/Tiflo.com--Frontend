import { v4 as uuidv4 } from 'uuid';

export let projectList = [
  {
    projectId: uuidv4(),
    name: "Sheep project",
    path: "/src/assets/photo/sheep.png",
    userId: "00000000-0000-0000-0000-000000000000",
    audioParts: [
      {
        partId: uuidv4(),
        projectId: "",
        start: 0,
        duration: 0,
        text: "На изображении показана овца с ягненком",
        path: "",
      }
    ]
  },
  {
    projectId: uuidv4(),
    name: "Bear project",
    path: "/src/assets/photo/bear.png",
    userId: "00000000-0000-0000-0000-000000000000",
    audioParts: [
      {
        partId: uuidv4(),
        projectId: "",
        start: 0,
        duration: 0,
        text: "На фото бурый медведь",
        path: "",
      }
    ]
  },
  {
    projectId: uuidv4(),
    name: "Interstellar film",
    path: "/src/assets/photo/interstellar.png",
    userId: "00000000-0000-0000-0000-000000000000",
    audioParts: [
      {
        partId: uuidv4(),
        projectId: "",
        start: 0,
        duration: 0,
        text: "На изображении показана группа из шести астронавтов, стоящих на скалистой снежной поверхности, возможно, " +
          "на горе или скале. Все они носят белые костюмы, что говорит о том, что они являются частью космической мисси" +
          "и или исследовательской команды. Астронавты расположены в различных местах, а некоторые стоят ближе к переднему" +
          " плану, а другие - дальше, создавая ощущение глубины и масштабирования в сцене",
        path: "",
      }
    ]
  },
  {
    projectId: uuidv4(),
    name: "Jason Statham",
    path: "/src/assets/statham.mp4",
    userId: "00000000-0000-0000-0000-000000000000",
    audioParts: [
      {
        partId: uuidv4(),
        projectId: "",
        start: 0,
        duration: 30,
        text: "",
        path: "/src/assets/statham-part-1.wav",
      },
      {
        partId: uuidv4(),
        projectId: "",
        start: 30,
        duration: 110,
        text: "группа мужчин, стоящих рядом с черной машиной. Они одеты в синюю форму, и автомобиль кажется BMW. " +
          "Мужчины расположены перед машиной, а сцена происходит на грунтовой дороге.",
        path: "/src/assets/statham-description.wav",
      },
      {
        partId: uuidv4(),
        projectId: "",
        start: 140,
        duration: 130,
        text: "",
        path: "/src/assets/statham-part-2.wav",
      }
    ]
  },
]
