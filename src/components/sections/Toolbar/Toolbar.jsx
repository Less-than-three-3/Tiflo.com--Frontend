import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";
import {onboarding} from "../../../models/onboarding.js";
import { iconPath } from "../../../models/consts.js";

export const Toolbar = ({states, handlers}) => {
  const {pathname} = useLocation();
  const projectsRef = useRef(null);
  const photoRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    onboarding.pushPhoto({
      component: projectsRef.current,
      data: onboarding.data.toolbarProjects,
    });
    onboarding.pushPhoto({
      component: photoRef.current,
      data: onboarding.data.toolbarPhoto,
    });
    onboarding.pushPhoto({
      component: videoRef.current,
      data: onboarding.data.toolbarVideo,
    });
  }, []);

  const openProjectList = () => {
    handlers.setIsProjectListOpened((v) => !v)
  }

  const navigate = useNavigate();
  const openPhotoProject = async () => {
    navigate(`/project/photo`);
  }

  const openVideoProject = async () => {
    navigate(`/project/video`);
  }

  return (
    <>
      <div className="section pt-12 flex flex-col gap-12">
        <img src={states.isProjectListOpened ?
          `${iconPath}/list_active.svg` :
          `${iconPath}/list_inactive.svg`}
             alt="list"
             className="toolbar-icon"
             onClick={openProjectList}
             ref={projectsRef}
        />

        <img src={pathname.includes("/project/photo") ?
          `${iconPath}/image_active.svg` :
          `${iconPath}/image_inactive.svg`}
             alt="image"
             className="toolbar-icon"
             onClick={openPhotoProject}
             ref={photoRef}
        />

        <img src={pathname.includes("/project/video") ?
          `${iconPath}/video_active.svg` :
          `${iconPath}/video_inactive.svg`}
             alt="video"
             className="toolbar-icon"
             onClick={openVideoProject}
             ref={videoRef}
        />
      </div>
    </>
  );
}
