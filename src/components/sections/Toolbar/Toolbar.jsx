import {useNavigate} from "react-router-dom";

export const Toolbar = ({states, handlers}) => {
  const navigate = useNavigate();

  const openHome = () => {
    navigate("/")
  }

  const openProjectList = () => {
    handlers.setIsProjectListOpened((v) => !v)
  }

  const openPhotoEditor = () => {
    navigate("/")
  }

  const openVideoEditor = () => {
    navigate("/video")
  }

  return (
    <>
      <div className="section pt-12 w-24 flex flex-col gap-12">
        <img src="/src/assets/icons/home_inactive.svg" alt="home" className="toolbar-icon"
             onClick={openHome}/>
        <img src={states.isProjectListOpened ?
              "/src/assets/icons/list_active.svg" :
              "/src/assets/icons/list_inactive.svg"}
             alt="list"
             className="toolbar-icon"
             onClick={openProjectList}/>
        <img src="/src/assets/icons/image_active.svg" alt="image" className="toolbar-icon"
             onClick={openPhotoEditor}/>
        <img src="/src/assets/icons/video_inactive.svg" alt="video" className="toolbar-icon"
             onClick={openVideoEditor}/>
      </div>
    </>
  );
}
