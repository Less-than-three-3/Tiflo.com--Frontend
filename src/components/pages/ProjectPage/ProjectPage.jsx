import {Toolbar} from "../../sections/Toolbar/Toolbar.jsx";
import {ProjectList} from "../../sections/ProjectList/ProjectList.jsx";
import {Outlet} from "react-router-dom";
import {useState} from "react";

export const ProjectPage = () => {
  const [isProjectListOpened, setIsProjectListOpened] = useState(true);

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
