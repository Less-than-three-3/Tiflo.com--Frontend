import axios from "axios";
import {host} from "../models/consts.js";
import {mock} from "../mocks/mock.js";

class Api {
  #isDeploy;

  constructor() {
    this.#isDeploy = import.meta.env.VITE_IS_DEPLOY === "true";
  }


  // ---  USER  ---

  async logout() {
    if (this.#isDeploy) {
      return await axios.post(`${host}/api/auth/logout`);
    } else {
      return mock.logout();
    }
  }

  async signIn(login, password) {
    if (this.#isDeploy) {
      return await axios.post(`${host}/api/auth/signIn`, {
        login: login,
        password: password,
      });
    } else {
      return mock.signIn(login, password);
    }
  }

  async signUp(login, password) {
    if (this.#isDeploy) {
      return await axios.post(`${host}/api/auth/signUp`, {
        login: login,
        password: password,
      });
    } else {
      return mock.signUp(login, password);
    }
  }


  //  --- PROJECTS  ---

  async getProjectList() {
    if (this.#isDeploy) {
      return await axios.get(`${host}/api/projects`);
    } else {
      return mock.getProjectList();
    }
  }

  async createProject() {
    if (this.#isDeploy) {
      return axios.post(`${host}/api/projects`);
    } else {
      return mock.createProject();
    }
  }

  async getProjectById(projectId) {
    if (this.#isDeploy) {
      return await axios.get(`${host}/api/projects/${projectId}`);
    } else {
      return mock.getProjectById(projectId);
    }
  }

  async updateProjectName(projectId, name) {
    if (this.#isDeploy) {
      return await axios.patch(`${host}/api/projects/${projectId}`, {
        name
      });
    } else {
      return mock.updateProjectName(projectId, name);
    }
  }

  async uploadMedia(projectId, file) {
    if (this.#isDeploy) {
      const formData = new FormData();
      formData.append('file', file);

      return await axios.post(`${host}/api/projects/${projectId}/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      return mock.uploadMedia(projectId, file);
    }
  }

  async createCommentToPhoto(projectId, imageId) {
    // if (this.#isDeploy) {
    //   return await axios.post(`${host}/api/projects/${projectId}/image/text`, {
    //     "name": imageId,
    //   })
    // } else {
      return mock.createCommentToPhoto(projectId, imageId);
    // }
  }

  async createCommentToVideo(projectId, splitPoint) {
    if (this.#isDeploy) {
      return await axios.post(`${host}/api/projects/${projectId}/video/comment`, {
        "splitPoint": splitPoint,
      })
    } else {
      return mock.createCommentToVideo(projectId, splitPoint);
    }
  }
}

export const api = new Api();
