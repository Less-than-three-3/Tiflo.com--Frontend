import {useEffect, useRef, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {useParams} from "react-router-dom";
import {host, iconPath} from "../../../models/consts.js";
import {onboarding} from "../../../models/onboarding.js";
import {Loader} from "../../UI/Loader/Loader.jsx";

const allowedExtensions = ['jpg', 'jpeg', 'png'];
const maxSize = 10 * 1024 * 1024; 

export const PhotoEditor = ({setLoadingText}) => {
  const {project, setProject} = useProject();
  const {setProjectList} = useProjectList();
  const [invalidExt, setInvalidExt] = useState(false);
  const [isLargeFile, setIsLargeFile] = useState(false);

  const [loading, setLoading] = useState(false);

  const params = useParams();
  const hiddenFileInput = useRef(null);
  const uploadRef = useRef(null);

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
    const uploadedFile = event.target.files[0];

    const fileName = uploadedFile.name;
    const fileExtension = fileName
      .split('.')
      .pop()
      .toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setInvalidExt(true);
      setLoading(false);
      return;
    }

    if (uploadedFile.size > maxSize) {
      setIsLargeFile(true);
      setLoading(false);
      return;
    }

    setInvalidExt(false);
    setIsLargeFile(false);

    const uploadMediaRes = await api.uploadMedia(project.projectId, uploadedFile);
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
    } else if (createTextRes.status >= 500) {
      console.log("Image to text service is unavailable!");
      const getProjectRes = await api.getProjectById(project.projectId);
      console.log("get project response", getProjectRes)
      setLoadingText(false);
      if (getProjectRes.status === 200) {
        console.log("Сервис описания изображений не доступен!")
        getProjectRes.data.audioParts[0].text = "<Сервис описания изображений не доступен, но вы можете сами написать комментарий>"
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
                <img src={`${iconPath}/upload.svg`} alt=""/>
                <input
                  type="file"
                  onChange={uploadFile}
                  ref={hiddenFileInput}
                  style={{display: 'none'}}
                />
                <div>
                  <div>Загрузите изображение</div>
                  <div>Кликните сюда</div>
                  
                  {invalidExt &&
                    <>
                      <div className="mt-4">НЕДОПУСТИМЫЙ ФОРМАТ ФАЙЛА!</div>
                      <div>Допускаются форматы .jpg, .jpeg, .png</div> 
                    </>
                  }

                  {isLargeFile &&
                    <>
                      <div className="mt-4">НЕДОПУСТИМЫЙ РАЗМЕР ФАЙЛА!</div>
                      <div>Загрузите файл размером до 10 МБ</div> 
                    </>
                  }
                </div>
              </div>
            }
          </>
        }
      </div>
    </>
  );
};
