import {useEffect, useRef, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {useProjectList} from "../../../hooks/useProjectList.js";
import {useParams} from "react-router-dom";
import {host} from "../../../models/consts.js";

export const PhotoEditor = () => {
  const {project, setProject} = useProject();
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();
  const {setProjectList} = useProjectList();
  const params = useParams();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = async (event) => {
    const uploadedFIle = event.target.files[0];
    setFile(uploadedFIle);

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
  };

  const toText = async () => {
    const createTextRes = await api.createCommentToPhoto(project.projectId, project.path);
    if (createTextRes.status === 200) {
      setProject({
        ...project,
        audioParts: [
          {
            partId: "d6f2d2da-e076-4a72-a5d3-52874b80d694",
            start: 0,
            duration: 0,
            text: createTextRes.data,
            path: project.path,
          },
        ]
      })
    }
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
            <div className="border-4 border-dashed border-mouse rounded-3xl
                            flex justify-center items-center flex-col
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
                <div>Загрузите изображение</div>
                <div>Или перетащите изображение сюда</div>
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
};
