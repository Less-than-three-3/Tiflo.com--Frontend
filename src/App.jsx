import {Topbar} from "./components/sections/Topbar/Topbar.jsx";
import {Toolbar} from "./components/sections/Toolbar/Toolbar.jsx";
import {ProjectList} from "./components/sections/ProjectList/ProjectList.jsx";
import {PhotoEditor} from "./components/sections/PhotoEditor/PhotoEditor.jsx";
import {TextEditor} from "./components/sections/TextEditor/TextEditor.jsx";
import {useState} from "react";

export const App = () => {
  const [topbarH, setTopbarH] = useState(0)
  setTimeout(() => {
    setTopbarH(document.getElementById("topbar").clientHeight);
    console.log(topbarH);
  }, 0)

  return (
    <>
      <div className="flex flex-col gap-5 ">
        <Topbar/>

        {/* TODO нормально посчиать высоту */}
        <div className="flex gap-5" style={{height: `calc(100vh - ${topbarH}px)`}}>
          <Toolbar/>
          <ProjectList/>
          <PhotoEditor/>
          <TextEditor/>
        </div>
      </div>
    </>
  );
}
