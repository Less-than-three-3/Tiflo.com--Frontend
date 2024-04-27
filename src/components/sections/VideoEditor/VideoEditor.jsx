import {useEffect, useRef, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";

export const VideoEditor = ({setUpdateProject, play}) => {
  const {project, setProject, setProjectAudio} = useProject();
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();

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
    // if (play && videoRef && videoRef.current) {
    //   videoRef.current?.pause();
    // } else {
    //   videoRef.current?.play();
    // }
  }, [play, videoRef])

  const generateComment = async () => {
    // function convertSecondsToTime(seconds) {
    //   console.log("sec, ", seconds)
    //   const hours = Math.floor(seconds / 3600);
    //   const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    //   const milliseconds = (seconds - (hours * 3600) - (minutes * 60)) * 1000;
    //   const timeString = hours.toString().padStart(2, '0') + ':' +
    //     minutes.toString().padStart(2, '0') + ':' +
    //     milliseconds.toString().padStart(3, '0');
    //   return timeString;
    // }

    // console.log(convertSecondsToTime(videoRef.current.currentTime));
    const videoCommentRes = await api.createCommentToVideo(project.projectId, "00:00:03.000");

    if (videoCommentRes.status === 200) {
      setProjectAudio(videoCommentRes.data.audioParts);
      setUpdateProject((v) => v + 1);
    }
  }

  return (
    <>
      <div className="section grow">
        {!project.path ?
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
          :
          <>
            <div className="font-bold pb-8">Видео: {file && file.name}</div>
            <video className="h-80" controls ref={videoRef}>
              <source src={project.path} type="video/webm"/>
              Ваш браузер не поддерживает элемент video.
            </video>

            {/* timing: 00:03 */}
            {/*<div className="flex justify-between items-center">*/}
            {/*  <div>00:00</div>*/}
            {/*  <div className="flex justify-center items-center gap-4">*/}
            {/*    <img src="/src/assets/icons/past.svg" alt="" className="h-5"/>*/}
            {/*    <img src="/src/assets/icons/play.svg" alt="" className="h-8"/>*/}
            {/*    <img src="/src/assets/icons/forward.svg" alt="" className="h-5"/>*/}
            {/*  </div>*/}
              <img src="/src/assets/icons/add_text.svg" alt="" onClick={generateComment}/>
            {/*</div>*/}
          </>
        }
      </div>
    </>
  );
};
