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
        setProject(projectListRes.data[0]);
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
      console.log(projectListRes.data);
      if (projectListRes.status === 200) {
        setProjectList(projectListRes.data);
      }
    }
  };

  return (
    <>
      <div className="section grow">
        {project.path ?
          <>
            <div className="font-bold pb-8">Фото: {project.path || (file && file.name)}</div>
            <div style={{backgroundImage: `url(${project.path})`}}
                 className="background-image w-full h-4/6"/>
            <div className="mt-4 w-28">
              <Button mode="primary" value={"В текст"}/>
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
