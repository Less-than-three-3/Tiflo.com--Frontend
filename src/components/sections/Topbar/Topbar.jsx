import {Button} from "../../UI/Button/Button.jsx";
import {useEffect, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../../../hooks/useUser.js";
import {api} from "../../../api/api.js";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {EditMenu} from "./EditMenu/EditMenu.jsx";

export const Topbar = () => {
  const {user, dropUser} = useUser();
  const {project, setProject, clearProject} = useProject();
  const {clearProjectList} = useProjectList();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [showEditMenu, setShowEditMenu] = useState(false);

  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    setName(project.name)
  }, [project.name]);

  const saveProjectName = async (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);

      const updateNameRes = await api.updateProjectName(project.projectId, name);
      if (updateNameRes.status === 200) {
        setProject({
          ...project,
          name
        });
      }
    } else if (event.key === "Escape") {
      setIsEditing(false);
      setName(project.name)
    }
  }

  const logout = async () => {
    dropUser();
    clearProject();
    clearProjectList();

    navigate("/auth/signIn");
    await api.logout();
  }

  return (
    <>
      <div id="topbar"
           className={`${pathname === "/" ? "section-soul" : "section"} sticky top-0 
           flex items-center justify-between px-10 py-4 font-bold`}>
        <div className="text-xl">
          <Link to="/">
            Tiflo
          </Link>
        </div>

        {user.isLoggedIn ?
          <>
            <div className="text-xl flex items-center">
              {pathname !== "/" &&
                <>
                  <div>Проект:</div>

                  {isEditing ?
                    <input className="bg-inherit border-2 border-rat rounded-md p-2 outline-none ml-2"
                           type="text"
                           value={name}
                           onChange={(event) => setName(event.target.value)}
                           onKeyDown={saveProjectName}
                    />
                    :
                    <div className="ml-2">
                      {project.name}
                    </div>
                  }

                  <img src="/src/assets/icons/dots.svg"
                       alt=""
                       className="hover:cursor-pointer h-6 ml-2"
                       onClick={() => setShowEditMenu(true)}
                  />
                </>
              }
              {showEditMenu &&
                <EditMenu onClose={() => setShowEditMenu(false)}
                          setIsEditing={setIsEditing}
                />
              }
            </div>

            <div className="flex gap-6 items-center">
              <img src="/src/assets/icons/user.svg"
                   alt="user"
                   className="w-10"/>
              <div>{user.login}</div>
              <Button value="Выйти" mode="secondary" onClick={logout}/>
            </div>
          </>
          :
          <>
            <div className="flex gap-10">
              <Link to="/auth/signIn">
                <Button value="Войти | Регистрация"
                        mode="secondary"/>
              </Link>
            </div>
          </>
        }
      </div>
    </>
  );
}
