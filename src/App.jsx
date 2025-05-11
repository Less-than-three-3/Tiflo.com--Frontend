import {Route, Routes, useLocation} from "react-router-dom";

import {ProjectPage} from "./components/pages/ProjectPage/ProjectPage.jsx";
import {HomePage} from "./components/pages/HomePage/HomePage.jsx";
import {RegForm} from "./components/pages/AuthPage/RegForm.jsx";
import {PhotoCommentPage} from "./components/pages/ProjectPage/PhotoCommentPage/PhotoCommentPage.jsx";
import {VideoCommentPage} from "./components/pages/ProjectPage/VideoCommentPage/VideoCommentPage.jsx";
import {Topbar} from "./components/sections/Topbar/Topbar.jsx";
import {NotFoundPage} from "./components/pages/NotFoundPage/NotFoundPage.jsx";
import {AuthRegPage} from "./components/pages/AuthPage/AuthRegPage.jsx";
import {AuthForm} from "./components/pages/AuthPage/AuthForm.jsx";
import {useEffect} from "react";
import { assetPath } from "./models/consts.js";

export const App = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];

    if (pathname === "/") {
      html.style.overflowY = "scroll";
      html.style.backgroundImage = `url(${assetPath}/photo/purple_blur_3.jpg)`;
      html.style.backgroundRepeat = "no-repeat";
      html.style.backgroundSize = "cover";
      html.style.backgroundPositionX = "right";
    } else {
      html.style.overflowY="hidden";
      html.style.backgroundImage = "none";
      html.style.backgroundColor = "#111315";
    }
  }, [pathname])

  return (
    <>
      <div className="flex flex-col gap-5"
      >
        <Topbar/>

        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="auth" element={<AuthRegPage/>}>
            <Route path="signIn" element={<AuthForm/>}/>
            <Route path="signUp" element={<RegForm/>}/>
          </Route>
          <Route path="project" element={<ProjectPage/>}>
            <Route path="photo/:projectId" element={<PhotoCommentPage/>}/>
            <Route path="photo/*" element={<PhotoCommentPage/>}/>
            <Route path="video/:projectId" element={<VideoCommentPage/>}/>
            <Route path="video/*" element={<VideoCommentPage/>}/>
          </Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </>
  );
}
