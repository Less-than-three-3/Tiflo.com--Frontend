import {useProject} from "../../../hooks/useProject.js";
import {useState} from "react";
import {getProjects} from "../../../mocks/projects.js";
import axios from "axios";
import {host} from "../../../models/consts.js";

export const ProjectList = () => {
  const {project, newProject, setProject, setProjectId} = useProject();
  const projects = getProjects();

  const clockNewProject = async () => {
    newProject();
    const newProjectResponse = await axios.post(`${host}/api/projects`)
    console.log(newProjectResponse.data);
    setProjectId(newProjectResponse.data.projectId);

    setTimeout(() => {
      console.log("store project", project)
      axios.get(`${host}/api/projects/${newProjectResponse.data.projectId}`)
        .then((response) => {console.log(response.data)})
      // console.log("request project", getProject.data)
    }, 1000)

  }

  return (
    <>
      <div className="section w-96">
        <div className="grid grid-cols-2 font-bold mb-8">
          <div>Все проекты</div>
          <div className="text-inactive">Недавние</div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div style={{backgroundImage: "url(/src/assets/icons/new_project.svg)"}}
               className="background-image w-full h-24"
               onClick={clockNewProject}/>

          {projects.map((project) => (
            <div key={project.id}
                 style={{backgroundImage: `url(${project.media})`}}
                 className="background-image w-full h-24"
                  onClick={() => setProject(project)}/>
          ))}
        </div>
      </div>
    </>
  );
}
