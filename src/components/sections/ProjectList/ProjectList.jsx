import {useProject} from "../../../hooks/useProject.js";
import {useEffect, useRef} from "react";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {api} from "../../../api/api.js";
import {useLocation, useNavigate} from "react-router-dom";
import {determineFileType} from "../../../utils/format.js";
import {host} from "../../../models/consts.js";

export const ProjectList = () => {
  const {project, setProject} = useProject();
  const {projectList, setProjectList} = useProjectList();

  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const projectListRes = await api.getProjectList();
      setProjectList(projectListRes.data);
    })()
  }, [project])

  const clickNewProject = async () => {
    const newProjectRes = await api.createProject();
    if (newProjectRes.status === 200) {
      setProject(newProjectRes.data);
      if (pathname.includes("photo")) {
        navigate(`/project/photo/${newProjectRes.data.projectId}`);
      } else {
        navigate(`/project/video/${newProjectRes.data.projectId}`);
      }
    }
  }

  const clickExistingProject = (project) => {
    if (pathname.includes("photo")) {
      navigate(`/project/photo/${project.projectId}`);
    } else {
      navigate(`/project/video/${project.projectId}`);
    }
  }

  return (
    <>
      <div className="section w-60">
        <div className="flex justify-between font-bold mb-8 text-sm">
          {pathname.includes("/project/photo") &&
            <div>Описание фото</div>
          }
          {pathname.includes("/project/video") &&
            <div>Комментарии к видео</div>
          }
        </div>

        <div className="grid grid-cols-2 gap-3 overflow-y-auto" style={{maxHeight: "90%"}}>
          <div style={{backgroundImage: "url(/src/assets/icons/new_project.svg)"}}
               className="project-image"
               onClick={clickNewProject}/>

          {pathname.includes("/project/photo") &&
            projectList.filter((projectItem) => determineFileType(projectItem.path) === "image" ||
              determineFileType(projectItem.path) === "none").map((projectItem) => (
              <div key={projectItem.projectId}
                   style={{backgroundImage: `url(${((api.isDeploy && projectItem.previewPath) ? `${host}/media/${projectItem.previewPath}` : projectItem.previewPath) || `/src/assets/icons/image_inactive.svg`})`}}
                   className={`${project.projectId === projectItem.projectId && "border-2"} project-image`}
                   onClick={() => clickExistingProject(projectItem)}/>
            ))}

          {pathname.includes("/project/video") &&
            projectList.filter((projectItem) => determineFileType(projectItem.path) === "video" ||
              determineFileType(projectItem.path) === "none").map((projectItem) => (
              <div key={projectItem.projectId}
                   style={{backgroundImage: `url(${((api.isDeploy && projectItem.previewPath) ? `${host}/media/${projectItem.previewPath}` : projectItem.previewPath) || `/src/assets/icons/image_inactive.svg`})`}}
                   className={`${project.projectId === projectItem.projectId && "border-2"} project-image`}
                   onClick={() => clickExistingProject(projectItem)}/>
            ))}
        </div>
      </div>
    </>
  );
}
