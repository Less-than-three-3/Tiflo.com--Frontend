import {ProjectPage} from "./components/pages/ProjectPage/ProjectPage.jsx";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./components/pages/HomePage/HomePage.jsx";
import {RegPage} from "./components/pages/RegPage/RegPage.jsx";
import {AuthPage} from "./components/pages/AuthPage/AuthPage.jsx";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<HomePage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="reg" element={<RegPage/>}/>
        <Route path="auth" element={<AuthPage/>}/>
        <Route path="project/" element={<ProjectPage/>}/>
      </Routes>
    </>
  );
}
