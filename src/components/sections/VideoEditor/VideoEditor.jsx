import {useEffect, useRef, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import axios from "axios";
import {host} from "../../../models/consts.js";
import {audioParts} from "../../../mocks/audioParts.js";

export const VideoEditor = ({setUpdateProject, play}) => {
  const {project, setProjectMedia, setProjectText, clearProjectAudio, setProjectAudio} = useProject();
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = async (event) => {
    const uploadedFIle = event.target.files[0];
    setFile(uploadedFIle);

    setProjectMedia(URL.createObjectURL(uploadedFIle));
    const formData = new FormData();
    formData.append('file', uploadedFIle);

    const mediaResponse = await axios.post(`${host}/api/projects/${project.id}/media`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (mediaResponse.status === 200) {
      const getProjectResponse = await axios.get(`${host}/api/projects/${project.id}`);
      setProjectAudio(getProjectResponse.data.audioParts[0].path);
      setTimeout(() => {
        setUpdateProject((v) => v + 1)
      }, 100)
    }
  };

  const videoRef = useRef(null);
  useEffect(() => {
    console.log(play)
    if (play && videoRef && videoRef.current) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [play, videoRef])

  const generateComment = async () => {
    // const genComResponse = await axios.post(`${host}/api/projects/${project.id}/video/comment`, {
    //   start: "00:03",
    // })

    clearProjectAudio();
    for (const audioPart of audioParts) {
      console.log("audioPart", audioPart)
      setProjectAudio(audioPart)
    }
    setTimeout(() => {
      setUpdateProject((v) => v + 1)
    }, 100)
  }

  return (
    <>
      <div className="section grow">
        {!project.media ?
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
              <source src={project.media} type="video/webm"/>
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
