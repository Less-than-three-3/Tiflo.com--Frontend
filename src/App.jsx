import {ProjectPage} from "./components/pages/ProjectPage/ProjectPage.jsx";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./components/pages/HomePage/HomePage.jsx";
import {RegPage} from "./components/pages/AuthPage/RegPage.jsx";
import {PhotoCommentPage} from "./components/pages/ProjectPage/PhotoCommentPage/PhotoCommentPage.jsx";
import {VideoCommentPage} from "./components/pages/ProjectPage/VideoCommentPage/VideoCommentPage.jsx";
import {Topbar} from "./components/sections/Topbar/Topbar.jsx";
import {NotFoundPage} from "./components/pages/NotFoundPage/NotFoundPage.jsx";
import {AuthRegContainer} from "./components/pages/AuthPage/AuthRegContainer.jsx";
import {useState} from "react";

export const App = () => {
  const [isRegistration, setIsRegistration] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 h-full">
        <Topbar setIsRegistration={setIsRegistration} />

        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="auth" element={<AuthRegContainer isRegistration={isRegistration} setIsRegistration={setIsRegistration} />}/>
          <Route path="project" element={<ProjectPage/>}>
            <Route path="photo" element={<PhotoCommentPage/>}/>
            <Route path="video" element={<VideoCommentPage/>}/>
          </Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </>
  );
}
