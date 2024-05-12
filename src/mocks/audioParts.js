export const audioPartsConf = [
  {
    id: 0,
    draggable: true,
    startPosition: 1,
    url: '/src/assets/audio-part-1.mp3',
    volume: 0.3,
    options: {
      waveColor: '#7A79FF',
    },
    isVideo: true,
  },
  {
    id: 1,
    draggable: true,
    startPosition: 1,
    url: '/src/assets/audio-part-2.mp3',
    volume: 0.3,
    options: {
      waveColor: '#37C87A',
    },
    isVideo: false,
  },
  {
    id: 2,
    draggable: true,
    startPosition: 10,
    url: '/src/assets/audio/audio-part-3.mp3',
    volume: 0.3,
    options: {
      waveColor: '#37C87A',
    },
    isVideo: false,
  },
  {
    id: 3,
    draggable: true,
    startPosition: 10, // start time relative to the entire multitrack
    url: '/src/assets/audio/audio-part-4.mp3',
    volume: 0.3,
    options: {
      waveColor: '#7A79FF',
    },
    isVideo: true,
  },
];

export const audioParts = [
  {
    partId: "d6f2d2da-e076-4a72-a5d3-52874b80d694",
    start: 0,
    duration: 3,
    text: "",
    path: "/src/assets/audio/audio-part-1.mp3",
  },
  {
    partId: "b656afef-8b64-4ce6-8311-1551d65853be",
    start: 3,
    duration: 11,
    text: "группа мужчин, стоящих рядом с черной машиной. Они одеты в синюю форму, и автомобиль кажется BMW. " +
      "Мужчины расположены перед машиной, а сцена происходит на грунтовой дороге.",
    path: "/src/assets/audio/audio-part-2.mp3",
  },
  {
    partId: "50e0117e-0864-4dba-8e2f-488b57765a63",
    start: 13,
    duration: 5,
    text: "",
    path: "/src/assets/audio/audio-part-3.mp3",
  },
  {
    partId: "b656afe1-8b64-4ce6-8311-1551d65853be",
    start: 15,
    duration: 11,
    text: "группа мужчин, стоящих рядом с черной машиной.",
    path: "/src/assets/audio/audio-part-3.mp3",
  },
  {
    partId: "50e01171-0864-4dba-8e2f-488b57765a63",
    start: 25,
    duration: 5,
    text: "",
    path: "/src/assets/audio/audio-part-4.mp3",
  }
]
