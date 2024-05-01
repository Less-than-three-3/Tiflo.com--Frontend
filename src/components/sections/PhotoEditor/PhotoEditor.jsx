import {useEffect, useRef, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";
import {api} from "../../../api/api.js";
import {useProjectList} from "../../../hooks/useProjectList.js";

export const PhotoEditor = () => {
  const {project, setProject} = useProject();
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();
  const {setProjectList} = useProjectList();

  useEffect(() => {
    (async () => {
      const projectListRes = await api.getProjectList();
      if (projectListRes.status === 200) {
        setProjectList(projectListRes.data);
        if (projectListRes.data && projectListRes.data.length > 0) {
          setProject(projectListRes.data[0]);
        }
      }
    })()
  }, [])

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = async (event) => {
    const uploadedFIle = event.target.files[0];
    setFile(uploadedFIle);

    const uploadMediaRes = await api.uploadMedia(project.projectId, uploadedFIle);
    if (uploadMediaRes.status === 200) {
      setProject({
        ...project,
        path: URL.createObjectURL(uploadedFIle)
      });

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
      <div className="section grow">
        {project.path ?
          <>
            <div className="font-bold pb-8">Фото: {project.path || (file && file.name)}</div>
            <div style={{backgroundImage: `url(${project.path})`}}
                 className="background-image w-full h-4/6"/>
            <div className="mt-4 w-28">
              <Button mode="primary" value={"В текст"} onClick={toText}/>
            </div>
          </>
          :
          <>
            <div className="border-4 border-dashed border-mouse rounded-3xl
                            flex justify-center items-center flex-col
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
