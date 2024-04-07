import {ProjectPage} from "./components/pages/ProjectPage/ProjectPage.jsx";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./components/pages/HomePage/HomePage.jsx";
import {RegPage} from "./components/pages/AuthPage/RegPage.jsx";
import {PhotoCommentPage} from "./components/pages/ProjectPage/PhotoCommentPage/PhotoCommentPage.jsx";
import {VideoCommentPage} from "./components/pages/ProjectPage/VideoCommentPage/VideoCommentPage.jsx";
import {Topbar} from "./components/sections/Topbar/Topbar.jsx";
import {NotFoundPage} from "./components/pages/NotFoundPage/NotFoundPage.jsx";
import {AuthRegContainer} from "./components/pages/AuthPage/AuthRegContainer.jsx";
import {useRef, useState} from "react";
import {AuthPage} from "./components/pages/AuthPage/AuthPage.jsx";

export const App = () => {
  const btnRef = useRef(null);
  const pictureContainerRef = useRef(null);
  const inputContainerRef = useRef(null);

  return (
    <>
      <div className="flex flex-col gap-5 h-full">
        <Topbar/>

        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="auth" element={<AuthRegContainer inputContainerRef={inputContainerRef}
                                                        pictureContainerRef={pictureContainerRef}/>}>
            <Route path="signIn" element={<AuthPage />}/>
            <Route path="signUp" element={<RegPage />}/>
          </Route>
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
