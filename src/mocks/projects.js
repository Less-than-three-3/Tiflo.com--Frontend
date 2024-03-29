export const getProjects = () => {
  return [
    {
      id: "1",
      name: "sheep",
      media: "/src/assets/photo/sheep.png",
      text: "На фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/phot" +
        "o/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/asse" +
        "ts/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/" +
        "src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фо" +
        "то овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep." +
        "pngНа фото овца/src/asseng",
    },
    {
      id: "2",
      name: "bear",
      media: "/src/assets/photo/bear.png",
      text: "На фото булый медведь",
    },
    {
      id: "3",
      name: "Interstellar film",
      media: "/src/assets/photo/interstellar.png",
      text: "На изображении показана группа из шести астронавтов, стоящих на скалистой снежной поверхности, возможно, " +
        "на горе или скале. Все они носят белые костюмы, что говорит о том, что они являются частью космической мисси" +
        "и или исследовательской команды. Астронавты расположены в различных местах, а некоторые стоят ближе к переднему" +
        " плану, а другие - дальше, создавая ощущение глубины и масштабирования в сцене"
    }
  ]
}

export const getProjectById = (id) => {
  return getProjects().find((project) => project.id.toString() === id.toString())
}
