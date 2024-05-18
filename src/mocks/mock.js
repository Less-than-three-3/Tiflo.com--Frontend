import {audioParts} from "./audioParts.js";
import {projectList} from "./projectList.js";

class Mock {
  logout() {
    console.log("Logout user")
    return {
      status: 200,
    }
  }

  signIn(login, password) {
    console.log(`Sign in user\nlogin: ${login}\npassword: ${password}`)
    return {
      status: 200,
      data: {
        login: login,
        message: "клиент успешно авторизован",
        userId: "00000000-0000-0000-0000-000000000000",
      }
    }
  }

  signUp(login, password) {
    return {
      status: 201,
      data: `Sign up user\nlogin: ${login}\npassword: ${password}`,
    }
  }

  getProjectList() {
    return {
      status: 200,
      data: projectList,
    }
  }

  createProject() {
    const newProject = {
      audioParts: null,
      name: "NewProject",
      path: "",
      projectId: "00000000-0000-0000-0000-000000000000",
      userId: "00000000-0000-0000-0000-000000000000"
    }

    projectList.unshift(newProject);

    return {
      status: 200,
      data: newProject,
    }
  }

  getProjectById(projectId) {
    return {
      status: 200,
      data: projectList.find((project) => project.projectId === projectId)
    }
  }

  deleteProject(projectId) {
    return {
      status: 200,
      data: `Delete project, \nid:${projectId}`,
    }
  }

  updateProjectName(projectId, name) {
    const id = projectList.findIndex((project) => project.projectId === projectId);
    projectList[id] = {
      ...projectList[id],
      name,
    };

    return {
      status: 200,
      data: {
        message: "Name successfully updated",
      },
    }
  }

  createComment(projectId, name) {
    console.log(`Create comment\nproject: ${projectId}\nfor media ${name}`)
  }

  uploadMedia(projectId, file) {
    const id = projectList.findIndex((project) => project.projectId === projectId);

    projectList[id] = {
      ...projectList[id],
      path: URL.createObjectURL(file),
      audioParts: [audioParts[0]],
    };

    return {
      status: 200,
      data: {
        message: "File uploaded successfully",
      }
    }
  }

  createCommentToPhoto(projectId, imageId) {
    console.log(`Create comment to photo\nproject: ${projectId}\nfor photo ${imageId}`);

    return {
      status: 200,
      data: "На изображении показана группа из шести астронавтов, стоящих на скалистой снежной поверхности, возможно, " +
        "на горе или скале. Все они носят белые костюмы, что говорит о том, что они являются частью космической мисси" +
        "и или исследовательской команды. Астронавты расположены в различных местах, а некоторые стоят ближе к переднему" +
        " плану, а другие - дальше, создавая ощущение глубины и масштабирования в сцене",
    }
  }

  createCommentToVideo(projectId, splitPoint, videoTime) {
    const id = projectList.findIndex((project) => project.projectId === projectId);

    projectList[id] = {
      ...projectList[id],
      audioParts: audioParts,
    };

    console.log(`Create comment to video\nproject: ${projectId}\nfor point ${splitPoint}\non video ${videoTime}`);

    return {
      status: 200,
      data: projectList[id],
    }
  }

  voiceComment(projectId, text) {
    console.log(`Voice comment ${text}\nfor project ${text}`)
    return {
      status: 200,
      data: "/src/assets/audio-part-4.mp3",
    }
  }

  createFinalAudio(projectId) {
    return {
      status: 200,
      data: `Create final audio for project ${projectId}`,
    }
  }

  deleteAudioPart(projectId, partId) {
    return {
      status: 200,
      data: `Delete audio part ${partId} for project ${projectId}`,
    }
  }

  changeTextComment(projectId, partId, text) {
    return {
      status: 200,
      data: `Change audio part ${partId} for project ${projectId}\nNew text: ${text}`,
    }
  }
}

export const mock = new Mock();
