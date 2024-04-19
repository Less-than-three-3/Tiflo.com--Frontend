import {Toolbar} from "../../sections/Toolbar/Toolbar.jsx";
import {ProjectList} from "../../sections/ProjectList/ProjectList.jsx";
import {Outlet, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";

export const ProjectPage = () => {
  const [isProjectListOpened, setIsProjectListOpened] = useState(true);
  const {project} = useProject()

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
