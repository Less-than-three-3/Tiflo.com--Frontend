import {Topbar} from "./components/sections/Topbar/Topbar.jsx";
import {Toolbar} from "./components/sections/Toolbar/Toolbar.jsx";
import {ProjectList} from "./components/sections/ProjectList/ProjectList.jsx";
import {PhotoEditor} from "./components/sections/PhotoEditor/PhotoEditor.jsx";
import {TextEditor} from "./components/sections/TextEditor/TextEditor.jsx";

export const App = () => {

  return (
    <>
      <div className="flex flex-col gap-5">
        <Topbar/>

        <div className="flex gap-5">
          <Toolbar/>
          <ProjectList/>
          <PhotoEditor/>
          <TextEditor/>
        </div>
      </div>
    </>
  );
}
