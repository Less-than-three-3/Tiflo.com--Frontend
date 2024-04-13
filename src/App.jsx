import {ProjectPage} from "./components/pages/ProjectPage/ProjectPage.jsx";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./components/pages/HomePage/HomePage.jsx";
import {RegForm} from "./components/pages/AuthPage/RegForm.jsx";
import {PhotoCommentPage} from "./components/pages/ProjectPage/PhotoCommentPage/PhotoCommentPage.jsx";
import {VideoCommentPage} from "./components/pages/ProjectPage/VideoCommentPage/VideoCommentPage.jsx";
import {Topbar} from "./components/sections/Topbar/Topbar.jsx";
import {NotFoundPage} from "./components/pages/NotFoundPage/NotFoundPage.jsx";
import {AuthRegPage} from "./components/pages/AuthPage/AuthRegPage.jsx";
import {AuthForm} from "./components/pages/AuthPage/AuthForm.jsx";
import {useState} from "react";

export const App = () => {
  return (
    <>
      <div className="flex flex-col gap-5 h-full">
        <Topbar/>

        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="auth" element={<AuthRegPage/>}>
            <Route path="signIn" element={<AuthForm/>}/>
            <Route path="signUp" element={<RegForm/>}/>
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
