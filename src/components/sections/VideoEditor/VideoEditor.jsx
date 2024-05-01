import {useEffect, useRef, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {convertNumberToTimestamp} from "../../../utils/media.js";
import {media} from "../../../models/media.js";
import {host} from "../../../models/consts.js";

export const VideoEditor = ({setUpdateProject}) => {
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

    const getProjectResponse = await api.getProjectById(project.projectId);
    if (getProjectResponse.status === 200) {
      setProject(getProjectResponse.data);
      console.log("project", project)

      if (!getProjectResponse.data.audioParts) {
        console.error("Cannot find audio parts\nproject.audioParts = ", getProjectResponse.data.audioParts);
      } else {
        setProjectAudio(getProjectResponse.data.audioParts);
        setUpdateProject((v) => v + 1)
      }
    }
  };

  const [play, setPlay] = useState(false);
  media.setVideo(useRef(null));

  const clickPlay = () => {
    setPlay(true);
    media.play();
  }

  const clickPause = () => {
    setPlay(false);
    media.pause();
  }

  const forward = () => {
    const newTime = media.getTime() + 10;
    media.setTime(newTime);
  }

  const back = () => {
    const newTime = media.getTime() - 10;
    media.setTime(newTime);
  }

  useEffect(() => {
    console.log("media", media)
    if (media.video.current) {
      media.video.current.addEventListener('loadedmetadata', () => {
        media.onMultitrackChange(() => {
          setTime(convertNumberToTimestamp(media.getTime()));
        });

        setDuration(convertNumberToTimestamp(media.getDuration()));
      });
    }
  }, [])

  const generateComment = async () => {
    console.log("generating comment", convertNumberToTimestamp(media.getTime()));
    const videoCommentRes = await api.createCommentToVideo(project.projectId, convertNumberToTimestamp(media.getTime()));
    if (videoCommentRes.status === 200) {
      setProjectAudio(videoCommentRes.data.audioParts);
      setUpdateProject((v) => v + 1);
    }
  }

  return (
    <>
      <div className="section grow">
        {project.path ?
          <>
            <div className="font-bold pb-8">Видео: {file && file.name}</div>
            <video className="h-80 m-auto mb-4" ref={media.video} muted>
                <source src={`${host}/media/${project.path}`} type="video/mp4"/>
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
                       onClick={clickPause}/>
                  :
                  <img src="/src/assets/icons/play.svg" alt=""
                       className="h-6"
                       onClick={clickPlay}/>
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
