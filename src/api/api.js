import {logoutMock, signInMock, signUpMock} from "../mocks/user.js";
import axios from "axios";
import {host} from "../models/consts.js";
import {createProjectMock, getProjectByIdMock, getProjectListMock} from "../mocks/projects.js";

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
      return getProjectByIdMock();
    }
  }
}

export const api = new Api();
