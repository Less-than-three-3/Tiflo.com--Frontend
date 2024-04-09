import {Link, useLocation} from "react-router-dom";

export const Toolbar = ({states, handlers}) => {
  const path = useLocation().pathname;

  const openProjectList = () => {
    handlers.setIsProjectListOpened((v) => !v)
  }

  return (
    <>
      <div className="section pt-12 w-24 flex flex-col gap-12">
        <Link to="/">
          <img src={path === "/" ?
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
        <Link to="/project/photo">
          <img src={path === "/project/photo" ?
            "/src/assets/icons/image_active.svg" :
            "/src/assets/icons/image_inactive.svg"}
               alt="image"
               className="toolbar-icon"/>
        </Link>
        <Link to="/project/video">
          <img src={path === "/project/video" ?
            "/src/assets/icons/video_active.svg" :
            "/src/assets/icons/video_inactive.svg"}
               alt="video"
               className="toolbar-icon"/>
        </Link>
      </div>
    </>
  );
}
