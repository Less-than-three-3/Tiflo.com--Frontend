import {Button} from "../../UI/Button/Button.jsx";
import {useEffect, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../../../hooks/useUser.js";
import {api} from "../../../api/api.js";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {projectList} from "../../../mocks/projectList.js";
import {determineFileType} from "../../../utils/format.js";

export const Topbar = () => {
  const {project, setProject} = useProject();
  const {pojectList, setProjectList} = useProjectList();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [showDelete, setShowDelete] = useState(false);
  const {user, dropUser} = useUser();

  useEffect(() => {
    setName(project.name)
  }, [project.name]);

  const saveProjectName = async (event) => {
    if (event.key === "Enter") {
      const updateNameRes = await api.updateProjectName(project.projectId, name)
      setProject({
        ...project,
        name
      });
      setIsEditing(false);
    } else if (event.key === "Escape") {
      setName(project.name)
      setIsEditing(false);
    }
  }

  const navigate = useNavigate();

  const logout = async () => {
    dropUser();
    navigate("/auth/signIn");
    await api.logout();
  }

  const {pathname} = useLocation();

  const deleteProject = async () => {
    const deleteProjectRes = await api.deleteProject(project.projectId);
    if (deleteProjectRes.status === 200) {
      const getProjectsList = await api.getProjectList();
      if (getProjectsList.status === 200) {
        setProjectList(getProjectsList.data);

        if (pathname.includes("/project/photo")) {
          const photoProjects = projectList.filter((project) => determineFileType(project.path) === "image");
          if (photoProjects.length > 0) {
            navigate(`/project/photo/${photoProjects[0].projectId}`);
          }
        } else if (pathname.includes("/project/video")) {
          const videoProjects = projectList.filter((project) => determineFileType(project.path) === "video");
          if (videoProjects.length > 0) {
            navigate(`/project/video/${videoProjects[0].projectId}`);
          }        }
      }
    }
  }

  return (
    <>
      <div id="topbar" className="section flex items-center justify-between px-10 py-4 font-bold">
        <div className="text-xl">Tiflo.tech</div>

        {user.isLoggedIn ?
          <>
            <div className="text-xl flex items-center"
                 onMouseOver={() => setShowDelete(true)}
                 onMouseOut={() => setShowDelete(false)}>
              <div>Проект:</div>

              {isEditing ?
                <input className="bg-inherit border-2 border-rat rounded-md p-2 outline-none ml-2" type="text"
                       value={name}
                       onChange={(event) => setName(event.target.value)}
                       onKeyDown={saveProjectName}/>
                :
                <div className="ml-2" onDoubleClick={() => setIsEditing(true)}>
                  {project.name}
                </div>
              }

              {showDelete &&
                <img src="/src/assets/icons/trash_can.svg" alt=""
                     className="h-6 ml-2"
                     onClick={deleteProject}/>
              }
            </div>

            <div className="flex gap-6 items-center">
              <img src="/src/assets/icons/user.svg" alt="user"
                   className="w-10"/>
              <div>{user.login}</div>
              <Button value="Выйти" mode="secondary" onClick={logout}/>
            </div>
          </>

          :

          <>
            <div className="flex gap-10">
              <Link to="/auth/signIn">
                <Button value="Войти" mode="primary"/>
              </Link>
              <Link to="/auth/signUp">
                <Button value="Регистрация" mode="secondary"/>
              </Link>
            </div>
          </>
        }
      </div>
    </>
  );
}
