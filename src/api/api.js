import {logoutMock, signInMock, signUpMock} from "../mocks/user.js";
import axios from "axios";
import {host} from "../models/consts.js";
import {
  createProjectMock,
  getProjectByIdMock,
  getProjectListMock,
  updateProjectNameMock,
  uploadMediaMock
} from "../mocks/projects.js";

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
      return logoutMock();
    }
  }

  async signIn(login, password) {
    if (this.#isDeploy) {
      return await axios.post(`${host}/api/auth/signIn`, {
        login: login,
        password: password,
      });
    } else {
      return signInMock(login, password);
    }
  }

  async signUp(login, password) {
    if (this.#isDeploy) {
      return await axios.post(`${host}/api/auth/signUp`, {
        login: login,
        password: password,
      });
    } else {
      return signUpMock(login, password);
    }
  }


  //  --- PROJECTS  ---

  async getProjectList() {
    if (this.#isDeploy) {
      return await axios.get(`${host}/api/projects`);
    } else {
      return getProjectListMock();
    }
  }

  async createProject() {
    if (this.#isDeploy) {
      return axios.post(`${host}/api/projects`);
    } else {
      return createProjectMock();
    }
  }

  async getProjectById(projectId) {
    if (this.#isDeploy) {
      return await axios.get(`${host}/api/projects/${projectId}`);
    } else {
      return getProjectByIdMock(projectId);
    }
  }

  async updateProjectName(projectId, name) {
    if (this.#isDeploy) {
      return await axios.patch(`${host}/api/projects/${projectId}`, {
        name
      });
    } else {
      return updateProjectNameMock(projectId, name);
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
      return uploadMediaMock(projectId, file);
    }
  }
}

export const api = new Api();
