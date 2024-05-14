import {useEffect, useRef} from "react";
import {Divider} from "../../../UI/Divider/Divider.jsx";
import {api} from "../../../../api/api.js";
import {determineFileType} from "../../../../utils/format.js";
import {useProjectList} from "../../../../hooks/useProjectList.js";
import {useProject} from "../../../../hooks/useProject.js";
import {useLocation, useNavigate} from "react-router-dom";

export const EditMenu = ({onClose, setIsEditing}) => {
  const {projectList, setProjectList} = useProjectList();
  const {project, setProject} = useProject();
  const ref = useRef(null);
  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const closePopup = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", closePopup);
  }, [onClose]);

  const deleteProject = async () => {
    const deleteProjectRes = await api.deleteProject(project.projectId);
    if (deleteProjectRes.status === 200) {
      const getProjectsListRes = await api.getProjectList();
      if (getProjectsListRes.status === 200) {
        setProjectList(getProjectsListRes.data);

        if (pathname.includes("/project/photo")) {
          const photoProjects = getProjectsListRes.data.filter((project) => determineFileType(project.path) === "image");
          if (photoProjects.length > 0) {
            navigate(`/project/photo/${photoProjects[0].projectId}`);
          } else {
            const newProjectRes = await api.createProject();
            if (newProjectRes.status === 200) {
              setProject(newProjectRes.data);
              navigate(`/project/photo/${newProjectRes.data.projectId}`);
            }
          }
        } else if (pathname.includes("/project/video")) {
          const videoProjects = projectList.filter((project) => determineFileType(project.path) === "video");
          if (videoProjects.length > 0) {
            navigate(`/project/video/${videoProjects[0].projectId}`);
          } else {
            const newProjectRes = await api.createProject();
            if (newProjectRes.status === 200) {
              setProject(newProjectRes.data);
              navigate(`/project/video/${newProjectRes.data.projectId}`);
            }
          }
        }
      }
    }
  }

  const onEdit = () => {
    setIsEditing(true);
    onClose();
  }

  const onDelete = () => {
    deleteProject();
    onClose();
  }

  return (
    <>
      <div>
        <div className="bg-wolf text-sm ml-2 px-3 py-2.5 absolute top-4 rounded-md"
             ref={ref}
        >
          <div className="hover:cursor-pointer"
               onClick={onEdit}
          >
            Rename
          </div>
          <Divider/>
          <div className="hover:cursor-pointer text-red-500"
               onClick={onDelete}
          >
            Delete project
          </div>
        </div>
      </div>
    </>
  );
}
