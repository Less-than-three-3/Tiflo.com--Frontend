import {Button} from "../../UI/Button/Button.jsx";
import {useEffect, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {Link, useNavigate, useNavigation} from "react-router-dom";

export const Topbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const {project, setProjectName} = useProject();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);

  useEffect(() => {
    setName(project.name)
  }, [project.name]);

  const saveProjectName = (event) => {
    if (event.key === "Enter") {
      setProjectName(name)
      setIsEditing(false);
    } else if (event.key === "Escape") {
      setName(project.name)
      setIsEditing(false);
    }
  }

  const navigate = useNavigate();

  const toSignIn = () => {
    navigate("/auth/signIn");
  }

  const toSignUp = () => {
    navigate("/auth/signUp");
  }

  return (
    <>
      <div id="topbar" className="section flex items-center justify-between px-10 py-6 font-bold">
        <Link to="/">
          <div className="text-2xl">Tiflo.com</div>
        </Link>

        {isSignedIn ?
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

            <div className="flex gap-6">
              <img src="/src/assets/icons/user.svg" alt="user"
                   className="w-10"/>
            </div>
          </>

          :

          <>
            <div className="flex gap-10">
              <Button value="SignIn" mode="primary" onClick={toSignIn}/>
              <Button value="SignUp" mode="secondary" onClick={toSignUp}/>
            </div>
          </>
        }
      </div>
    </>
  );
}
