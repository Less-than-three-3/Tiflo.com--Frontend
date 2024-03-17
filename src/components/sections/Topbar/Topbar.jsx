import {Button} from "../../UI/Button/Button.jsx";
import {useEffect, useState} from "react";

export const Topbar = ({project, setProject}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState(project.name);

  useEffect(() => {
    setProjectName(project.name)
  }, [project.name]);

  const saveProjectName = (event) => {
    if (event.key === "Enter") {
      setProject({
        id: project.id,
        name: projectName,
        photo: project.photo,
        text: project.text,
      });

      setIsEditing(false);
    }
  }

  return (
    <>
      <div id="topbar" className="section flex items-center justify-between px-10 py-6 font-bold">
        <div className="text-2xl">Tiflo.com</div>
        <div className="text-xl flex items-center">
          <div>
            Проект:
          </div>
          {isEditing ?
            <input className="bg-inherit border-2 border-rat rounded-md p-2 outline-none ml-2" type="text"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              onKeyDown={saveProjectName}/>
            :
            <div className="ml-2" onDoubleClick={() => setIsEditing(true)}>
              {projectName}
            </div>
          }


        </div>
        <div className="flex gap-6">
          <img src="/src/assets/icons/user.svg" alt="user"
               className="w-10"/>
          <Button value={"Экспорт"}/>
        </div>
      </div>
    </>
  );
}
