import {useProject} from "../../../hooks/useProject.js";
import {useState} from "react";
import {getProjects} from "../../../mocks/projects.js";

export const ProjectList = () => {
  const {newProject, setProject} = useProject();
  const projects = getProjects();

  return (
    <>
      <div className="section basis-1/5">
        <div className="grid grid-cols-2 font-bold mb-8">
          <div>Все проекты</div>
          <div className="text-inactive">Недавние</div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div style={{backgroundImage: "url(/src/assets/icons/new_project.svg)"}}
               className="background-image w-full h-24"
               onClick={() => {
                 newProject();
               }}/>

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
