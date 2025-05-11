import {useEffect, useRef, useState} from "react";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {convertNumberToTimestamp, convertNumberToTimestampWithMS} from "../../../utils/format.js";
import {media} from "../../../models/media.js";
import {host, iconPath} from "../../../models/consts.js";
import {useParams} from "react-router-dom";
import {Loader} from "../../UI/Loader/Loader.jsx";
import {onboarding} from "../../../models/onboarding.js";

export const VideoEditor = ({setLoadingComment}) => {
  const {project, setProject, setProjectAudio} = useProject();

  const [time, setTime] = useState("00:00:00");
  const [duration, setDuration] = useState("00:00:00");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const hiddenFileInputRef = useRef(null);
  const addCommentRef = useRef(null);

  const pushAddCommentToOB = () => {
    onboarding.pushVideo({
      component: addCommentRef.current,
      data: onboarding.data.addVideoComment,
    });
  }

  const handleClick = () => {
    hiddenFileInputRef.current.click();
  };

  const uploadFile = async (event) => {
    media.setSplitPoint(0);

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
    setLoadingComment(true);
    media.setSplitPoint(media.getAudioTime());
    const videoCommentRes = await api.createCommentToVideo(project.projectId,
      convertNumberToTimestampWithMS(media.getAudioTime()),
      convertNumberToTimestampWithMS(media.getVideoTime()));

    if (videoCommentRes.status === 200) {
      setProjectAudio(videoCommentRes.data.audioParts);
    }
    setLoadingComment(false);
  }

  return (
    <>
      <div className="section grow text-sm flex flex-col justify-between">
        {project.path ?
          <>
            <video className="m-auto mb-4"
                   style={{
                     height: "80%",
                     maxWidth: "500px",
                   }}
                   ref={media.video}
                   key={params.projectId}
                   src={api.isDeploy ? `${host}/media/${project.path}` : project.path}
                   muted
            />

            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <div className="text-purple">{time}</div>
                <div>/</div>
                <div>{duration}</div>
              </div>

              <div className="flex items-center gap-3">
                <img src={`${iconPath}/past.svg`} alt=""
                     className="h-5"
                     onClick={back}/>
                {play ?
                  <img src={`${iconPath}/pause.svg`} alt=""
                       className="h-6"
                       onClick={clickPause}/>
                  :
                  <img src={`${iconPath}/play.svg`} alt=""
                       className="h-6"
                       onClick={clickPlay}/>
                }
                <img src={`${iconPath}/forward.svg`} alt=""
                     className="h-5"
                     onClick={forward}/>
              </div>

              <img src={`${iconPath}/add_text.svg`} alt=""
                   onClick={generateComment}
              />
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
                <img src={`${iconPath}/upload.svg`} alt=""/>
                <input
                  type="file"
                  onChange={uploadFile}
                  ref={hiddenFileInputRef}
                  style={{display: 'none'}}
                />

                <div>
                  <div>Загрузите видео</div>
                  <div>Кликните сюда</div>
                </div>
              </div>
            }
            <div className="w-full flex justify-end">
              <img src={`${iconPath}/add_text_inactive.svg`} alt=""
                   ref={addCommentRef}
                   onLoad={pushAddCommentToOB}
              />
            </div>
          </>
        }
      </div>
    </>
  );
};
