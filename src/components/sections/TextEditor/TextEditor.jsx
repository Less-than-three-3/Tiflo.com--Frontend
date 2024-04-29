import {useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {useLocation} from "react-router-dom";
import {Timestamp} from "../../UI/Timestamp/Timestamp.jsx";

export const TextEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {project, updateProjectAudio} = useProject();

  const location = useLocation();
  const pathname = location.pathname;

  const changeText = (event) => {
    const part = project.audioParts.find((part) => part.partId === event.currentTarget.id);
    updateProjectAudio({
      ...part,
      text: event.currentTarget.value,
    });
  }

  const toVoice = async () => {
    const text = project.audioParts.find((part) => part.text !== "").text;
    const voiceTextRes = await api.voiceTheText(project.projectId, text);
    if (voiceTextRes.status === 200) {
      const fileName = voiceTextRes.data;
      await api.getAudio(fileName);
    }
  }

  return (
    <>
      <div className="section" style={{width: "30em"}}>
        <div className="grid grid-cols-2 pb-6 w-9/12">
          <div className={`${!project.projectId ? "text-inactive" : isEditing && "text-inactive"} font-bold`}
               onClick={() => setIsEditing(false)}>
            Текст
          </div>
          <div className={`${!project.projectId ? "text-inactive" : !isEditing && "text-inactive"} font-bold`}
               onClick={() => setIsEditing(true)}>
            Редактирование
          </div>
        </div>
        <div className="h-5/6 w-full">
          {project.projectId && project.audioParts?.filter((part) => part.text !== "").map((part) => (
            <div key={part.partId}>
              {isEditing ?
                <>
                  {pathname === "/project/video" &&
                    <Timestamp time="00:00:03"/>
                  }
                  <textarea className="bg-inherit border-2 border-rat rounded-md p-2 outline-none w-full h-full"
                            value={part.text}
                            onChange={changeText}
                            id={part.partId}
                  />
                  {pathname === "/project/video" &&
                    <Timestamp time="00:00:11"/>
                  }
                </>
                :
                <>
                  {pathname === "/project/video" &&
                    <Timestamp time="00:00:03"/>
                  }
                  <div className="overflow-x-hidden min-h-10 max-h-full text-pretty break-words"
                       id={part.partId}>
                    {part.text}
                  </div>
                  {pathname === "/project/video" &&
                    <Timestamp time="00:00:11"/>
                  }
                </>
              }
            </div>
          ))}

          {project.audioParts?.some((part) => part !== "") && pathname === "/project/photo" &&
            <div className="mt-4 w-28">
              <Button mode="primary" value={"В голос"} onClick={toVoice}/>
            </div>
          }
        </div>
      </div>
    </>
  );
}
