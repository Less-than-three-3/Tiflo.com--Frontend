import {Timestamp} from "../../../UI/Timestamp/Timestamp.jsx";
import {convertNumberToTimestamp} from "../../../../utils/format.js";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import {useProject} from "../../../../hooks/useProject.js";
import {api} from "../../../../api/api.js";
import { iconPath } from "../../../../models/consts.js";

export const Comment = ({part, isEditing, setIsEditing}) => {
  const {project, setProject} = useProject();
  const {pathname} = useLocation();
  const [currentText, setCurrentText] = useState("");
  const [currentPartId, setCurrentPartId] = useState("");

  const focusText = (event) => {
    console.log("click")
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
    console.log("change")
    setCurrentText(event.currentTarget.value);
  }

  const updateComment = async (event) => {
    console.log("text", event.currentTarget.textContent)
    if (event.ctrlKey && event.key === 'Enter') {
      console.log(event.currentTarget.value);
      const changeTextRes = await api.changeTextComment(project.projectId, event.currentTarget.id, event.currentTarget.textContent);
      if (changeTextRes.status === 200) {
        const getProjectRes = await api.getProjectById(project.projectId);
        if (getProjectRes.status === 200) {
          setProject(getProjectRes.data);
        }
      }
      setIsEditing(false);
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
    <div className="relative mb-4"
         key={part.partId}
         onMouseOver={() => showDeleteBtn(true, part.partId)}
         onMouseOut={() => showDeleteBtn(false, part.partId)}>

      {pathname.includes("/project/video") && isEditing &&
        <img src={`${iconPath}/trash_can.svg`} alt=""
             className="h-5 hidden absolute right-2 bottom-10"
             id={`delete_${part.partId}`}
             onClick={() => deletePart(part.partId)}
        />
      }

      <div className="flex flex-col items-center"
           onDoubleClick={() => setIsEditing(true)}>

          {pathname.includes("/project/video") &&
            <Timestamp time={convertNumberToTimestamp(part.start / 10)}
                       setTime={setStart}
                       isEditing={isEditing}/>
          }
          <div contentEditable={isEditing}
               className={"bg-inherit outline-none h-full box-content overflow-y-hidden " + (isEditing && "editable")}
               onClick={focusText}
               onChange={changeText}
               onKeyDown={updateComment}
               id={part.partId}
          >
            {isFocused(part.partId) ? currentText : part.text}
          </div>

          {pathname.includes("/project/video") &&
            <Timestamp time={convertNumberToTimestamp((part.start + part.duration) / 10)}
                       setTime={setEnd}
                       isEditing={isEditing}/>
          }
      </div>
    </div>
  )
}
