import {useProject} from "../../../hooks/useProject.js";
import {useEffect} from "react";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {api} from "../../../api/api.js";

export const ProjectList = () => {
  const {project, newProject, setProject} = useProject();
  const {projectList, setProjectList} = useProjectList();

  useEffect(() => {
    (async () => {
      const projectListRes = await api.getProjectList()
      setProjectList(projectListRes.data);
    })()
  }, [project])

  const clickNewProject = async () => {
    const newProjectRes = await api.createProject();
    if (newProjectRes.status === 200) {
      setProject(newProjectRes.data);
    }
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
               onClick={clickNewProject}/>

          {projectList.map((project) => (
            <div key={project.projectId}
                 style={{backgroundImage: `url(${project.path || "/src/assets/icons/image_inactive.svg"})`}}
                 className="background-image w-full h-24"
                 onClick={() => setProject(project)}/>
          ))}
        </div>
      </div>
    </>
  );
}
