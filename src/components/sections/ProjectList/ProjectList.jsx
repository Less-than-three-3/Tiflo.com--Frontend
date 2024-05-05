import {useProject} from "../../../hooks/useProject.js";
import {useEffect} from "react";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {api} from "../../../api/api.js";
import {useLocation, useNavigate} from "react-router-dom";
import {determineFileType} from "../../../utils/format.js";
import {host} from "../../../models/consts.js";

export const ProjectList = () => {
  const {project, setProject} = useProject();
  const {projectList, setProjectList} = useProjectList();
  const navigate = useNavigate();
  const location = useLocation();

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
      if (location.pathname.includes("photo")) {
        navigate(`/project/photo/${newProjectRes.data.projectId}`);
      } else {
        navigate(`/project/video/${newProjectRes.data.projectId}`);
      }
    }
  }

  const clickExistingProject = (project) => {
    if (location.pathname.includes("photo")) {
      navigate(`/project/photo/${project.projectId}`);
    } else {
      navigate(`/project/video/${project.projectId}`);
    }
  }

  return (
    <>
      <div className="section w-60">
        <div className="flex justify-between font-bold mb-8 text-sm">
          <div>Все проекты</div>
          <div className="text-inactive">Недавние</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div style={{backgroundImage: "url(/src/assets/icons/new_project.svg)"}}
               className="project-image"
               onClick={clickNewProject}/>

          {location.pathname.includes("/project/photo") &&
            projectList.filter((project) => determineFileType(project.path) === "image" ||
              determineFileType(project.path) === "none").map((project) => (
              <div key={project.projectId}
                   style={{backgroundImage: `url(${(api.isDeploy ? `${host}/media/${project.path}` : project.path) || "/src/assets/icons/image_inactive.svg"})`}}
                   className="project-image"
                   onClick={() => clickExistingProject(project)}/>
            ))}

          {location.pathname.includes("/project/video") &&
            projectList.filter((project) => determineFileType(project.path) === "video" ||
              determineFileType(project.path) === "none").map((project) => (
              <div key={project.projectId}
                   style={{backgroundImage: `url("/src/assets/icons/image_inactive.svg")`}}
                   className="project-image"
                   onClick={() => clickExistingProject(project)}/>
            ))}
        </div>
      </div>
    </>
  );
}
