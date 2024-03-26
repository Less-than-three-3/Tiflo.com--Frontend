import {Topbar} from "../../sections/Topbar/Topbar.jsx";
import {Toolbar} from "../../sections/Toolbar/Toolbar.jsx";
import {ProjectList} from "../../sections/ProjectList/ProjectList.jsx";
import {Outlet, Route, Routes} from "react-router-dom";
import {PhotoCommentPage} from "./PhotoCommentPage/PhotoCommentPage.jsx";
import {VideoCommentPage} from "./VideoCommentPage/VideoCommentPage.jsx";
import {useEffect, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {getProjectById} from "../../../mocks/projects.js";

export const ProjectPage = () => {
  const [isProjectListOpened, setIsProjectListOpened] = useState(true);
  const {project, setProject} = useProject()

  useEffect(() => {
    setProject(getProjectById(1));
  }, []);

  return (
    <>
      {/* TODO нормально посчиать высоту */}
      <div className="flex gap-5" style={{height: `calc(100vh - 100px)`}}>
        <Toolbar states={{isProjectListOpened}} handlers={{setIsProjectListOpened}}/>

        {isProjectListOpened &&
          <ProjectList/>
        }

        <Outlet/>
      </div>
    </>
  );
}
