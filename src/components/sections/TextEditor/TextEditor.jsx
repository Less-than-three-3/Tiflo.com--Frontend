import {useEffect, useRef, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {useLocation} from "react-router-dom";
import {Comment} from "./Comment/Comment.jsx";
import {onboarding} from "../../../models/onboarding.js";
import {Loader} from "../../UI/Loader/Loader.jsx";

export const TextEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {project} = useProject();
  const location = useLocation();
  const pathname = location.pathname;
  const textEditorRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onboarding.pushPhoto({
      component: textEditorRef.current,
      data: onboarding.data.textEditor,
    });
  }, []);

  const toVoice = async () => {
    setLoading(true);
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
    setLoading(false);
  }

  return (
    <>
      <div className="section text-sm h-full"
           style={{width: "30em"}}
           ref={textEditorRef}
      >
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

        {loading ?
          <Loader/>
          :
          <div className="w-full overflow-y-auto" style={{maxHeight: "70%"}}>
            {project.projectId && project.audioParts?.filter((part) => part.text !== "")
              .sort((a, b) => a.start > b.start ? 1 : -1)
              .map((part) => (
                <Comment part={part} isEditing={isEditing} setIsEditing={setIsEditing} key={part.partId}/>
              ))}
          </div>
        }

        {project.audioParts?.some((part) => part.text !== "") &&
          <div className="mt-4 w-28">
            <Button mode="primary" value={"To voice"} onClick={toVoice}/>
          </div>
        }
      </div>
    </>
  );
}
