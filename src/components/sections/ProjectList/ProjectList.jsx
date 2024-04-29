import {useProject} from "../../../hooks/useProject.js";
import {useEffect} from "react";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {api} from "../../../api/api.js";
import {useLocation, useNavigate} from "react-router-dom";
import {determineFileType} from "../../../utils/media.js";

export const ProjectList = () => {
  const {project, setProject} = useProject();
  const {projectList, setProjectList} = useProjectList();

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
    }
  }

  const navigate = useNavigate();
  const clickExistingProject = (project) => {
    const fileType = determineFileType(project.path);
    switch (fileType) {
      case "image":
        navigate("/project/photo");
        setProject(project)
        break;
      case "video":
        navigate("/project/video");
        setProject(project)
        break;
      case "none":
        console.error("Forbidden file format:", project.path);
        break;
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

          {location.pathname === "/project/photo" &&
            projectList.filter((project) => determineFileType(project.path) === "image" ||
              determineFileType(project.path) === "none").map((project) => (
              <div key={project.projectId}
                   style={{backgroundImage: `url(${project.path || "/src/assets/icons/image_inactive.svg"})`}}
                   className="background-image w-full h-24"
                   onClick={() => clickExistingProject(project)}/>
            ))}

          {location.pathname === "/project/video" &&
            projectList.filter((project) => determineFileType(project.path) === "video" ||
              determineFileType(project.path) === "none").map((project) => (
              <div key={project.projectId}
                   style={{backgroundImage: `url("/src/assets/icons/image_inactive.svg")`}}
                   className="background-image w-full h-24"
                   onClick={() => clickExistingProject(project)}/>
            ))}
        </div>
      </div>
    </>
  );
}
