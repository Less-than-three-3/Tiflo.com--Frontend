import {useEffect, useRef, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {useParams} from "react-router-dom";
import {host} from "../../../models/consts.js";
import {onboarding} from "../../../models/onboarding.js";
import {Loader} from "../../UI/Loader/Loader.jsx";

export const PhotoEditor = ({setLoadingText}) => {
  const {project, setProject} = useProject();
  const hiddenFileInput = useRef(null);
  const {setProjectList} = useProjectList();
  const params = useParams();
  const uploadRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onboarding.pushPhoto({
      component: uploadRef.current,
      data: onboarding.data.photoUpload,
    });
  });

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = async (event) => {
    setLoading(true);
    const uploadedFIle = event.target.files[0];

    const uploadMediaRes = await api.uploadMedia(project.projectId, uploadedFIle);
    if (uploadMediaRes.status === 200) {
      const getProjectRes = await api.getProjectById(params.projectId);
      if (getProjectRes.status === 200) {
        setProject(getProjectRes.data);
      }

      const projectListRes = await api.getProjectList();
      if (projectListRes.status === 200) {
        setProjectList(projectListRes.data);
      }
    }
    setLoading(false);
  };

  const toText = async () => {
    setLoadingText(true);
    const createTextRes = await api.createCommentToPhoto(project.projectId, project.path);
    if (createTextRes.status === 200) {
      const getProjectRes = await api.getProjectById(project.projectId);
      if (getProjectRes.status === 200) {
        setProject(getProjectRes.data);
      }
    }
    setLoadingText(false);
  }

  return (
    <>
      <div className="section grow text-sm">
        {project.path ?
          <>
            <div style={{backgroundImage: api.isDeploy ? `url(${host}/media/${project.path})` : `url(${project.path})`}}
                 className="background-image w-full h-4/6"/>
            <div className="mt-4 w-28">
              <Button mode="primary" value={"В текст"} onClick={toText}/>
            </div>
          </>
          :
          <>
            {loading ?
              <Loader/>
              :
              <div className="relative border-4 border-dashed border-mouse rounded-3xl
                            flex justify-center items-center flex-col
                            m-auto mt-10 p-20 w-96"
                   onClick={handleClick}
                   ref={uploadRef}
              >
                <img src="/src/assets/icons/upload.svg" alt=""/>
                <input
                  type="file"
                  onChange={uploadFile}
                  ref={hiddenFileInput}
                  style={{display: 'none'}}
                />
                <div>
                  <div>Загрузите изображение</div>
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
