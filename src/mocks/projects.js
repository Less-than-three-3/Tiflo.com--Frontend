const projectList = [
  {
    projectId: "00000000-0000-0000-0000-000000000001",
    name: "Sheep project",
    path: "/src/assets/photo/sheep.png",
    userId: "00000000-0000-0000-0000-000000000000",
    audioParts: [
      {
        partId: "00000000-0000-0000-0000-000000000000",
        projectId: "00000000-0000-0000-0000-000000000000",
        start: 0,
        duration: 0,
        text: "На изображении показана овца с ягненком",
        path: "",
      }
    ]
  },
  {
    projectId: "00000000-0000-0000-0000-000000000002",
    name: "Bear project",
    path: "/src/assets/photo/bear.png",
    userId: "00000000-0000-0000-0000-000000000000",
    audioParts: [
      {
        partId: "00000000-0000-0000-0000-000000000000",
        projectId: "00000000-0000-0000-0000-000000000000",
        start: 0,
        duration: 0,
        text: "На фото бурый медведь",
        path: "",
      }
    ]
  },
  {
    projectId: "00000000-0000-0000-0000-000000000003",
    name: "Interstellar film",
    path: "/src/assets/photo/interstellar.png",
    userId: "00000000-0000-0000-0000-000000000000",
    audioParts: [
      {
        partId: "00000000-0000-0000-0000-000000000000",
        projectId: "00000000-0000-0000-0000-000000000000",
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
]

export const getProjectListMock = () => {
  return {
    status: 200,
    data: projectList,
  }
}

export const createProjectMock = () => {
  return {
    status: 200,
    data: {
      audioParts: null,
      name: "NewProject",
      path: "",
      projectId: "00000000-0000-0000-0000-000000000000",
      userId: "00000000-0000-0000-0000-000000000000"
    }
  }
}

export const getProjectByIdMock = (projectId) => {
  return {
    status: 200,
    data: projectList.find((project) => project.id.toString() === projectId.toString())
  }
}

export const deleteProjectMock = (projectId) => {
  console.log(`Delete project, \nid:${projectId}`)
}

export const updateProjectNameMock = (projectId, name) => {
  console.log(`Update project name, \nid: ${projectId}\nname:${name}`)
}

export const createCommentMock = (projectId, name) => {
  console.log(`Create comment\nproject: ${projectId}\nfor media ${name}`)
}

export const uploadMediaMock = (projectId, file) => {
  console.log(`Upload media ${file}\nfor project ${projectId}`)
}

export const voiceCommentMock = (projectId, text) => {
  console.log(`Voice comment ${text}\nfor project ${text}`)
}
