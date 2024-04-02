import {ProjectPage} from "./components/pages/ProjectPage/ProjectPage.jsx";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./components/pages/HomePage/HomePage.jsx";
import {RegPage} from "./components/pages/RegPage/RegPage.jsx";
import {AuthPage} from "./components/pages/AuthPage/AuthPage.jsx";
import {PhotoCommentPage} from "./components/pages/ProjectPage/PhotoCommentPage/PhotoCommentPage.jsx";
import {VideoCommentPage} from "./components/pages/ProjectPage/VideoCommentPage/VideoCommentPage.jsx";
import {Topbar} from "./components/sections/Topbar/Topbar.jsx";
import {NotFoundPage} from "./components/pages/NotFoundPage/NotFoundPage.jsx";

export const App = () => {
  return (
    <>
      <div className="flex flex-col gap-5 h-full">
        <Topbar/>

        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="reg" element={<RegPage/>}/>
          <Route path="auth" element={<AuthPage/>}/>
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
