import {Button} from "../../UI/Button/Button.jsx";
import {useEffect, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../../../hooks/useUser.js";
import {api} from "../../../api/api.js";

export const Topbar = () => {
  const {project, setProject} = useProject();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);

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
    const logoutRes = await api.logout();

    if (logoutRes.status === 200) {
      dropUser();
      navigate("/")
    }

  }

  return (
    <>
      <div id="topbar" className="section flex items-center justify-between px-10 py-6 font-bold">
        <Link to="/">
          <div className="text-2xl">Tiflo.com</div>
        </Link>

        {user.isLoggedIn ?
          <>
            <div className="text-xl flex items-center">
              <div>
                Проект:
              </div>
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
              <Link to="/">
                <Button value="Войти" mode="primary"/>
              </Link>
              <Link to="/signUp">
                <Button value="Регистрация" mode="secondary"/>
              </Link>
            </div>
          </>
        }
      </div>
    </>
  );
}
