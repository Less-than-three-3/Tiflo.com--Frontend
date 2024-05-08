import {useEffect, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {useLocation} from "react-router-dom";
import {Timestamp} from "../../UI/Timestamp/Timestamp.jsx";
import {convertNumberToTimestamp} from "../../../utils/format.js";

export const TextEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {project, updateProjectAudio, setProject} = useProject();
  const [boxSizes, setBoxSizes] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const [currentText, setCurrentText] = useState("");
  const [currentPartId, setCurrentPartId] = useState("");

  useEffect(() => {
    const boxes = document.getElementsByClassName("non-editable");
    if (boxes.length > 0) {
      setBoxSizes([]);
      for (const box of boxes) {
        setBoxSizes([...boxSizes, box.scrollHeight + 30])
      }
    }
  }, [])

  const focusText = (event) => {
    if (event.currentTarget.id !== currentPartId) {
      const part = project.audioParts.find((part) => part.partId === event.currentTarget.id);
      setCurrentText(part.text);
      setCurrentPartId(part.partId);
    }
  }

  const isFocused = (partId) => {
    return partId === currentPartId;
  }

  const changeText = (event) => {
    setCurrentText(event.currentTarget.value);
    // const part = project.audioParts.find((part) => part.partId === event.currentTarget.id);

    // updateProjectAudio({
    //   ...part,
    //   text: event.currentTarget.value,
    // });
  }

  const updateComment = async (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      const changeTextRes = await api.changeTextComment(project.projectId, event.currentTarget.id, currentText);
      if (changeTextRes.status === 200) {
        const getProjectRes = await api.getProjectById(project.projectId);
        if (getProjectRes.status === 200) {
          setProject(getProjectRes.data);
        }
      }
    }
  }

  const toVoice = async () => {
    if (pathname.includes("/project/photo/")) {
      const text = project.audioParts.find((part) => part.text !== "").text;
      const voiceTextRes = await api.voiceTheText(project.projectId, text);

      if (voiceTextRes.status === 200) {
        const fileName = voiceTextRes.data;
        await api.getAudio(fileName);
      }
    }

    if (pathname.includes("/project/video/")) {
      const finalAudioRes = await api.createFinalAudio(project.projectId);
      if (finalAudioRes.status === 200) {
        const fileName = finalAudioRes.data.path + ".wav";
        await api.getAudio(fileName);
      }
    }
  }

  const showDeleteBtn = (isShown, partId) => {
    if (pathname.includes("/project/video") && isEditing) {
      const img = document.getElementById(`delete_${partId}`);
      img.style.display = isShown ? "block" : "none";
    }
  }

  const deletePart = async (partId) => {
    const deleteRes = await api.deleteAudioPart(project.projectId, partId);
    if (deleteRes.status === 200) {
      const getProjectRes = await api.getProjectById(project.projectId);
      if (getProjectRes.status === 200) {
        setProject(getProjectRes.data);
      }
    }
  }

  const setStart = (time) => {

  }

  const setEnd = (time) => {

  }

  return (
    <>
      <div className="section text-sm" style={{width: "30em"}}>
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
        <div className=" w-full overflow-y-scroll">
          {project.projectId && project.audioParts?.filter((part) => part.text !== "")
            .sort((a, b) => a.partId > b.partId ? 1 : -1)
            .map((part, i) => ({
              ...part,
              height: boxSizes[i],
            }))
            .map((part) => (
              <div className="relative"
                   key={part.partId}
                   onMouseOver={() => showDeleteBtn(true, part.partId)}
                   onMouseOut={() => showDeleteBtn(false, part.partId)}>

                {pathname.includes("/project/video") && isEditing &&
                  <img src="/src/assets/icons/trash_can.svg" alt=""
                       className="h-5 hidden absolute right-2 bottom-10"
                       id={`delete_${part.partId}`}
                       onClick={() => deletePart(part.partId)}
                  />
                }

                <div className="flex flex-col items-center"
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
                        value={isFocused(part.partId) ? currentText : part.text}
                        onClick={focusText}
                        onChange={changeText}
                        onKeyDown={updateComment}
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
              </div>
            ))}

        </div>

        {project.audioParts?.some((part) => part.text !== "") &&
          <div className="mt-4 w-28">
            <Button mode="primary" value={"В голос"} onClick={toVoice}/>
          </div>
        }
      </div>
    </>
  );
}
