import axios from "axios";
import {host} from "../models/consts.js";
import {mock} from "../mocks/mock.js";

class Api {
  isDeploy;

  constructor() {
    this.isDeploy = import.meta.env.VITE_IS_DEPLOY === "true";
  }


  // ---  USER  ---

  async logout() {
    if (this.isDeploy) {
      const response = await axios.post(`${host}/api/auth/logout`);
      return response;
    } else {
      return mock.logout();
    }
  }

  async signIn(login, password) {
    if (this.isDeploy) {
      const response = await axios.post(`${host}/api/auth/signIn`, {
        login: login,
        password: password,
      });
      return response;
    } else {
      return mock.signIn(login, password);
    }
  }

  async signUp(login, password) {
    if (this.isDeploy) {
      const response = await axios.post(`${host}/api/auth/signUp`, {
        login: login,
        password: password,
      });
      return response;
    } else {
      return mock.signUp(login, password);
    }
  }


  //  --- PROJECTS  ---

  async getProjectList() {
    if (this.isDeploy) {
      const response = await axios.get(`${host}/api/projects`);
      return response;
    } else {
      return mock.getProjectList();
    }
  }

  async createProject() {
    if (this.isDeploy) {
      const response = axios.post(`${host}/api/projects`);
      return response;
    } else {
      return mock.createProject();
    }
  }

  async getProjectById(projectId) {
    if (this.isDeploy) {
      const response = await axios.get(`${host}/api/projects/${projectId}`);
      return response;
    } else {
      return mock.getProjectById(projectId);
    }
  }

  async deleteProject(projectId) {
    if (this.isDeploy) {
      const response = await axios.delete(`${host}/api/projects/${projectId}`)
      return response;
    } else {
      return mock.deleteProject(projectId);
    }
  }

  async updateProjectName(projectId, name) {
    if (this.isDeploy) {
      const response = await axios.patch(`${host}/api/projects/${projectId}`, {
        name
      });
      return response;
    } else {
      return mock.updateProjectName(projectId, name);
    }
  }

  async uploadMedia(projectId, file) {
    if (this.isDeploy) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${host}/api/projects/${projectId}/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } else {
      return mock.uploadMedia(projectId, file);
    }
  }

  async createCommentToPhoto(projectId, imageId) {
    if (this.isDeploy) {
      const response = await axios.post(`${host}/api/projects/${projectId}/image/comment`, {
        "name": imageId,
      });
      return response;
    } else {
      return mock.createCommentToPhoto(projectId, imageId);
    }
  }

  async createCommentToVideo(projectId, splitPoint) {
    if (this.isDeploy) {
      const response = await axios.post(`${host}/api/projects/${projectId}/video/comment`, {
        "splitPoint": splitPoint,
      })
      return response;
    } else {
      return mock.createCommentToVideo(projectId, splitPoint);
    }
  }

  async voiceTheText(projectId, text) {
    if (this.isDeploy) {
      const response = await axios.post(`${host}/api/projects/${projectId}/voice`, {
        "text": text,
      });
      return response;
    } else {
      return mock.voiceComment(projectId, text)
    }
  }

  async createFinalAudio(projectId) {
    if (this.isDeploy) {
      const response = await axios.post(`${host}/api/projects/${projectId}/audio`);
      return response;
    } else {
      return mock.createFinalAudio(projectId);
    }
  }

  async deleteAudioPart(projectId, partId) {
    if (this.isDeploy) {
      const response = await axios.delete(`${host}/api/projects/${projectId}/audio-part/${partId}`);
      return response;
    } else {
      return mock.deleteAudioPart(projectId, partId);
    }
  }

  async changeTextComment(projectId, partId, text) {
    if (this.isDeploy) {
      const response = await axios.put(`${host}/api/projects/${projectId}/audio-part/${partId}`, {
        "text": text,
      });
      return response;
    } else {
      return mock.changeTextComment(projectId, partId, text)
    }
  }

  //  --- Get audio file
  async getAudio(fileName) {
    if (this.isDeploy) {
      const response = await axios({
        url: `${host}/media/${fileName}`, //your url
        method: 'GET',
        responseType: 'blob', // important
      })

      if (response.status) {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'description.wav'); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      }
    }
  }
}

export const api = new Api();
