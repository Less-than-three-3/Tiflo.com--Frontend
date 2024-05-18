import {useEffect, useRef, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {convertNumberToTimestamp, convertNumberToTimestampWithMS} from "../../../utils/format.js";
import {media} from "../../../models/media.js";
import {host} from "../../../models/consts.js";
import {useParams} from "react-router-dom";
import {Loader} from "../../UI/Loader/Loader.jsx";

export const VideoEditor = () => {
  const {project, setProject, setProjectAudio} = useProject();
  const hiddenFileInput = useRef(null);
  const [time, setTime] = useState("00:00:00");
  const [duration, setDuration] = useState("00:00:00");
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [])

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = async (event) => {
    setLoading(true);
    const uploadedFIle = event.target.files[0];
    const mediaResponse = await api.uploadMedia(params.projectId, uploadedFIle);
    const getProjectResponse = await api.getProjectById(params.projectId);
    if (getProjectResponse.status === 200) {
      setProject(getProjectResponse.data);

      if (getProjectResponse.data.audioParts) {
        setProjectAudio(getProjectResponse.data.audioParts);
      }
    }
    setLoading(false);
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
    const newTime = media.getAudioTime() + 10;
    media.setTime(newTime);
  }

  const back = () => {
    const newTime = media.getAudioTime() - 10;
    media.setTime(newTime);
  }

  useEffect(() => {
    if (media.video.current) {
      media.video.current.addEventListener('loadedmetadata', () => {
        setTimeout(() => {
          media.onMultitrackChange(() => {
            setTime(convertNumberToTimestamp(media.getAudioTime()));
          });

          setDuration(convertNumberToTimestamp(media.getDuration()));
        }, 100)
      });
    }
  }, [project])

  const generateComment = async () => {
    const videoCommentRes = await api.createCommentToVideo(project.projectId,
      convertNumberToTimestampWithMS(media.getAudioTime()),
      convertNumberToTimestampWithMS(media.getVideoTime()));

    if (videoCommentRes.status === 200) {
      setProjectAudio(videoCommentRes.data.audioParts);
    }
  }

  return (
    <>
      <div className="section grow text-sm">
        {project.path ?
          <>
            <video className="m-auto mb-4 h-5/6"
                   ref={media.video}
                   muted
                   key={params.projectId}
                   src={api.isDeploy ? `${host}/media/${project.path}` : project.path}
                   onLoad={() => setLoading(false)}
            />

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
            {loading ?
              <Loader/>
              :
              <div className="border-4 border-dashed border-mouse rounded-3xl
                            video flex justify-center items-center flex-col
                            m-auto mt-10 p-20 w-96"
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
                  <div>Кликните сюда</div>
                </div>
              </div>
            }
          </>
        }
      </div>
    </>
  );
};
