import {Topbar} from "./components/sections/Topbar/Topbar.jsx";
import {Toolbar} from "./components/sections/Toolbar/Toolbar.jsx";
import {ProjectList} from "./components/sections/ProjectList/ProjectList.jsx";
import {PhotoEditor} from "./components/sections/PhotoEditor/PhotoEditor.jsx";
import {TextEditor} from "./components/sections/TextEditor/TextEditor.jsx";
import {useEffect, useState} from "react";

export const App = () => {

  const [isProjectListOpened, setIsProjectListOpened] = useState(true);
  const [projectId, setProjectId] = useState("");
  // const project = projects.find((prj) => prj.id === projectId);
  const project = {
    id: "1",
    name: "sheep",
    photo: "/src/assets/photo/sheep.png",
    text: "На фото овца",
  };
  const [text, setText] = useState("")

  return (
    <>
      <div className="flex flex-col gap-5 ">
        <Topbar/>

        {/* TODO нормально посчиать высоту */}
        <div className="flex gap-5" style={{height: `calc(100vh - 100px)`}}>
          <Toolbar states={{isProjectListOpened}} handlers={{setIsProjectListOpened}}/>

          {isProjectListOpened &&
            <ProjectList setProjectId={setProjectId}/>
          }

          <PhotoEditor projectId={projectId} setProjectId={setProjectId} setText={setText}/>
          <TextEditor text={text} projectId={projectId}/>
        </div>
      </div>
    </>
  );
}
