import {Link, useLocation, useNavigate} from "react-router-dom";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {determineFileType} from "../../../utils/format.js";

export const Toolbar = ({states, handlers}) => {
  const {pathname} = useLocation();
  const {projectList} = useProjectList();

  const openProjectList = () => {
    handlers.setIsProjectListOpened((v) => !v)
  }

  const navigate = useNavigate();
  const openPhotoProject = () => {
    const projectId = projectList.filter((project) => determineFileType(project.path) === "image")[0].projectId;
    navigate(`/project/photo/${projectId}`);
  }

  const openVideoProject = () => {
    const projectId = projectList.filter((project) => determineFileType(project.path) === "video")[0].projectId;
    navigate(`/project/video/${projectId}`);
  }

  return (
    <>
      <div className="section pt-12 w-24 flex flex-col gap-12">
        <Link to="/">
          <img src={pathname === "/" ?
            "/src/assets/icons/home_active.svg" :
            "/src/assets/icons/home_inactive.svg"}
               alt="home"
               className="toolbar-icon"/>
        </Link>

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
