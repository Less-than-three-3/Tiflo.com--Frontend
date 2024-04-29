import {useEffect, useRef, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {convertNumberToTimestamp} from "../../../utils/media.js";

export const VideoEditor = ({multitrackRef, setUpdateProject, play, setPlay}) => {
  const {project, setProject, setProjectAudio} = useProject();
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();
  const [time, setTime] = useState("00:00:00");
  const [duration, setDuration] = useState("00:00:00");

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = async (event) => {
    const uploadedFIle = event.target.files[0];
    setFile(uploadedFIle);

    setProject({
      ...project,
      path: URL.createObjectURL(uploadedFIle),
    });

    const mediaResponse = await api.uploadMedia(project.projectId, uploadedFIle);
    if (mediaResponse.status === 200) {
      const getProjectResponse = await api.getProjectById(project.projectId);
      if (getProjectResponse.status === 200) {
        if (!getProjectResponse.data.audioParts) {
          console.error("Cannot find audio parts\nproject.audioParts = ", getProjectResponse.data.audioParts);
        } else {
          setProjectAudio(getProjectResponse.data.audioParts);
          setUpdateProject((v) => v + 1)
        }
      }
    }
  };

  const videoRef = useRef(null);
  useEffect(() => {
    if (!play && videoRef && videoRef.current) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [play, videoRef])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        setDuration(convertNumberToTimestamp(videoRef.current.duration));
      });

      videoRef.current.addEventListener("timeupdate", () => {
        setTime(convertNumberToTimestamp(videoRef.current.currentTime));
      });
    }
  }, [])

  const generateComment = async () => {
    const videoCommentRes = await api.createCommentToVideo(project.projectId, "00:00:03.000");
    if (videoCommentRes.status === 200) {
      setProjectAudio(videoCommentRes.data.audioParts);
      setUpdateProject((v) => v + 1);
    }
  }

  const forward = () => {
    multitrackRef.current.setTime(multitrackRef.current.getCurrentTime() + 10)
  }

  const back = () => {
    multitrackRef.current.setTime(multitrackRef.current.getCurrentTime() - 10)
  }

  return (
    <>
      <div className="section grow">
        {project.path ?
          <>
            <div className="font-bold pb-8">Видео: {file && file.name}</div>
            <video className="h-80 m-auto mb-4" ref={videoRef}>
              <source src={project.path} type="video/mp4"/>
              Ваш браузер не поддерживает элемент video.
            </video>

            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <div className="text-purple">{time}</div>
                <div>/</div>
                <div>{duration}</div>
              </div>

              <div className="flex items-center gap-3">
                <img src="/src/assets/icons/past.svg" alt=""
                     className="h-5"
                     onClick={back}/>
                {play ?
                  <img src="/src/assets/icons/pause.svg" alt=""
                       className="h-6"
                       onClick={() => setPlay(false)}/>
                  :
                  <img src="/src/assets/icons/play.svg" alt=""
                       className="h-6"
                       onClick={() => setPlay(true)}/>
                }
                <img src="/src/assets/icons/forward.svg" alt=""
                     className="h-5"
                     onClick={forward}/>
              </div>

              <img src="/src/assets/icons/add_text.svg" alt="" onClick={generateComment}/>
            </div>
          </>
          :
          <>
            <div className="border-4 border-dashed border-mouse rounded-3xl
                         video   flex justify-center items-center flex-col
                            m-14 p-20"
                 onClick={handleClick}>
              <img src="/src/assets/icons/upload.svg" alt=""/>
              <input
                type="file"
                onChange={uploadFile}
                ref={hiddenFileInput}
                style={{display: 'none'}}
              />
              <div>
                <div>Загрузите видео</div>
                <div>Или перетащите видео сюда</div>
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
};
