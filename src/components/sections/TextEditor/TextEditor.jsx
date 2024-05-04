import {useEffect, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {useLocation, useParams} from "react-router-dom";
import {Timestamp} from "../../UI/Timestamp/Timestamp.jsx";
import {convertNumberToTimestamp} from "../../../utils/format.js";

export const TextEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {project, updateProjectAudio, setProjectAudio} = useProject();
  const [boxSizes, setBoxSizes] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();

  useEffect(() => {
    const boxes = document.getElementsByClassName("non-editable");
    if (boxes.length > 0) {
      setBoxSizes([]);
      for (const box of boxes) {
        setBoxSizes([...boxSizes, box.scrollHeight + 30])
      }
    }
  }, [])

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

  const setStart = (time) => {

  }

  const setEnd = (time) => {

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
        <div className="h-5/6 w-full overflow-y-scroll">
          {project.projectId && project.audioParts?.filter((part) => part.text !== "")
            .map((part, i) => ({
              ...part,
              height: boxSizes[i],
            }))
            .map((part) => (
              <div className="flex flex-col items-center"
                   key={part.partId}
                   onDoubleClick={() => setIsEditing(true)}>
                {isEditing ?
                  <>
                    {pathname.includes("/project/video") &&
                      <Timestamp time={convertNumberToTimestamp(part.start / 10)}
                                 setTime={setStart}
                                 isEditing={isEditing}/>
                    }
                    <textarea
                      className="editable resize-none bg-inherit border-2 border-rat rounded-md
                        p-2 outline-none w-11/12 h-full box-content overflow-y-hidden"
                      style={{height: `${part.height}px`}}
                      value={part.text}
                      onChange={changeText}
                      id={part.partId}
                    />
                    {pathname.includes("/project/video") &&
                      <Timestamp time={convertNumberToTimestamp((part.start + part.duration) / 10)}
                                 setTime={setEnd}
                                 isEditing={isEditing}/>
                    }
                  </>
                  :
                  <>
                    {pathname.includes("/project/video") &&
                      <Timestamp time={convertNumberToTimestamp(part.start / 10)}
                                 setTime={setStart}
                                 isEditing={isEditing}/>
                    }
                    <div className="non-editable overflow-x-hidden min-h-10 max-h-full text-pretty break-words"
                         id={part.partId}>
                      {part.text}
                    </div>
                    {pathname.includes("/project/video") &&
                      <Timestamp time={convertNumberToTimestamp((part.start + part.duration) / 10)}
                                 setTime={setEnd}
                                 isEditing={isEditing}/>
                    }
                  </>
                }
              </div>
            ))}

          {project.audioParts?.some((part) => part !== "") && pathname.includes("/project/photo") &&
            <div className="mt-4 w-28">
              <Button mode="primary" value={"В голос"} onClick={toVoice}/>
            </div>
          }
        </div>
      </div>
    </>
  );
}
