import {Link, useLocation, useNavigate} from "react-router-dom";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {determineFileType} from "../../../utils/format.js";
import {api} from "../../../api/api.js";

export const Toolbar = ({states, handlers}) => {
  const {pathname} = useLocation();
  const {projectList} = useProjectList();

  const openProjectList = () => {
    handlers.setIsProjectListOpened((v) => !v)
  }

  const navigate = useNavigate();
  const openPhotoProject = async () => {
    let projectId;
    const photoProjects = projectList.filter((project) => determineFileType(project.path) === "image" || determineFileType(project.path) === "none");
    if (photoProjects.length !== 0) {
      projectId = photoProjects[0].projectId;
    } else {
      const createProjectRes = await api.createProject();
      if (createProjectRes.status === 200) {
        projectId = createProjectRes.data.projectId;
      }
    }
    navigate(`/project/photo/${projectId}`);
  }

  const openVideoProject = async () => {
    let projectId;
    const videoProjects = projectList.filter((project) => determineFileType(project.path) === "video" || determineFileType(project.path) === "none");
    if (videoProjects.length !== 0) {
      projectId = videoProjects[0].projectId;
    } else {
      const createProjectRes = await api.createProject();
      if (createProjectRes.status === 200) {
        projectId = createProjectRes.data.projectId;
      }
    }
    navigate(`/project/video/${projectId}`);
  }

  return (
    <>
      <div className="section pt-12 w-24 flex flex-col gap-12">
        {/*<Link to="/">*/}
        {/*  <img src={pathname === "/" ?*/}
        {/*    "/src/assets/icons/home_active.svg" :*/}
        {/*    "/src/assets/icons/home_inactive.svg"}*/}
        {/*       alt="home"*/}
        {/*       className="toolbar-icon"/>*/}
        {/*</Link>*/}

        <img src={states.isProjectListOpened ?
          "/src/assets/icons/list_active.svg" :
          "/src/assets/icons/list_inactive.svg"}
             alt="list"
             className="toolbar-icon"
             onClick={openProjectList}/>

        <img src={pathname.includes("/project/photo") ?
          "/src/assets/icons/image_active.svg" :
          "/src/assets/icons/image_inactive.svg"}
             alt="image"
             className="toolbar-icon"
             onClick={openPhotoProject}/>


        <img src={pathname.includes("/project/video") ?
          "/src/assets/icons/video_active.svg" :
          "/src/assets/icons/video_inactive.svg"}
             alt="video"
             className="toolbar-icon"
             onClick={openVideoProject}/>
      </div>
    </>
  );
}
