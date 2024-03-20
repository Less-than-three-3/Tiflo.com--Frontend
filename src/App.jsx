import {Topbar} from "./components/sections/Topbar/Topbar.jsx";
import {Toolbar} from "./components/sections/Toolbar/Toolbar.jsx";
import {ProjectList} from "./components/sections/ProjectList/ProjectList.jsx";
import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import {PhotoCommentPage} from "./components/pages/PhotoCommentPage/PhotoCommentPage.jsx";
import {useProject} from "./hooks/useProject.js";

export const App = () => {
  const [isProjectListOpened, setIsProjectListOpened] = useState(true);
  const {project, setProject} = useProject()
  setProject({
    id: "1",
    name: "sheep",
    media: "/src/assets/photo/sheep.png",
    text: "На фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.pngНа фото овца/src/assets/photo/sheep.png",
  });

  return (
    <>
      <div className="flex flex-col gap-5 ">
        <Topbar project={project} setProject={setProject}/>

        {/* TODO нормально посчиать высоту */}
        <div className="flex gap-5" style={{height: `calc(100vh - 100px)`}}>
          <Toolbar states={{isProjectListOpened}} handlers={{setIsProjectListOpened}}/>

          {isProjectListOpened &&
            <ProjectList project={project} setProject={setProject}/>
          }

          <Routes>
            <Route path="/" element={<PhotoCommentPage project={project} setProject={setProject}/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}
