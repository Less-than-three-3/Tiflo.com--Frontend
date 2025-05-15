import {useEffect, useRef, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {useLocation} from "react-router-dom";
import {Comment} from "./Comment/Comment.jsx";
import {onboarding} from "../../../models/onboarding.js";
import {Loader} from "../../UI/Loader/Loader.jsx";
import { useVoice } from "../../../hooks/useVoice.js";

export const TextEditor = ({loadingText}) => {
  const {project} = useProject();
  const voice = useVoice();

  const startVoice = (partId) => {
    if (voice) {
      console.log("start recording");
      voice.start();
    }
  };

  const stopVoice = async (partId) => {
    console.log("stop recording");
    const blob = await voice.stop();
    
    if (blob) {
      const formData = new FormData();
      formData.append('voice', blob, 'recording.webm');
      
      console.log("voiceData", formData);
      
      try {
        await api.setAudio(project.projectId, partId, formData);
        voice.clear();
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  const closeModal = () => {
    setShowAudioPopup(false);
    if (voice) voice.clear();
  };

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAudioPopup, setShowAudioPopup] = useState(true);

  const {pathname} = useLocation();
  const textEditorRef = useRef(null);

  useEffect(() => {
    if (pathname.includes("/project/photo")) {
      onboarding.pushPhoto({
        component: textEditorRef.current,
        data: onboarding.data.textEditorForPhoto,
      });
    }
    if (pathname.includes("/project/video")) {
      onboarding.pushVideo({
        component: textEditorRef.current,
        data: onboarding.data.textEditorForVideo,
      });
    }
  }, []);

  const toVoice = async () => {
    setLoading(true);
    if (pathname.includes("/project/photo/")) {
      const text = project.audioParts.find((part) => part.text !== "").text;
      const voiceTextRes = await api.voiceTheText(project.projectId, text);
      if (voiceTextRes.status === 200) {
        const fileName = voiceTextRes.data;
        await api.getAudio(fileName);
      } else if (voiceTextRes.status >= 500) {
        console.log("Сервис озвучивания не доступен!")
        setShowAudioPopup(true);
      }
    }

    if (pathname.includes("/project/video/")) {
      const finalAudioRes = await api.createFinalAudio(project.projectId);
      if (finalAudioRes.status === 200) {
        const fileName = finalAudioRes.data.path;
        await api.getAudio(fileName);
      }
    }
    setLoading(false);
  }

  // const startVoice = () => {
  //   console.log("start recording")
  //   voice.start();
  // }

  // const stopVoice = () => {
  //   console.log("stop recording")

  //   voice.stop();
  //   setTimeout(() => {
  //     const voiceData = voice.getVoiceData();
  //     console.log("voiceData", voiceData);
  //   }, 100);
  // }

  // const closeModal = () => {
  //   setShowAudioPopup(false);
  //   voice.clear();
  // }

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

        {loading || loadingText ?
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
            <Button mode="primary" value="Озвучить" onClick={toVoice}/>
          </div>
        }
      </div>

      {showAudioPopup && (<>
        <div className="h-full w-full bg-black opacity-50 absolute top-0 left-0"/>
        <div className="section absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between"
            style={{width: "40em", height: "30em"}}>
          <div>
            <div>Сервис озвучивания сейчас не доступен. Но вы можете озвучить тифлокомментарии сами!</div>

            <div className="w-full overflow-y-auto">
              {project.projectId && project.audioParts?.filter((part) => part.text !== "")
                .sort((a, b) => a.start > b.start ? 1 : -1)
                .map((part) => (
                  <div key={part.partId} className="flex justify-between w-full mt-4">
                    <div className="text-sm">{part.text}</div>
                    <div className="flex gap-2">
                      <Button value="Старт" mode="primary" onClick={() => startVoice(part.partId)}/>
                      <Button value="Стоп" mode="secondary" onClick={() => stopVoice(part.partId)}/>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="w-full">
            <Button value="Закрыть" mode="secondary" onClick={closeModal}/>
          </div>
        </div>
      </>)}
    </>
  );
}
