import {useRef, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";

export const PhotoEditor = () => {
  const {project, setProjectMedia} = useProject();
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = (event) => {
    const uploadedFIle = event.target.files[0];
    setFile(uploadedFIle);
    setProjectMedia(URL.createObjectURL(uploadedFIle));
  };

  return (
    <>
      <div className="section grow">
        {!project.media ?
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
          :
          <>
            <div className="font-bold pb-8">Фото: {file && file.name}</div>
            <div style={{backgroundImage: `url(${project.media})`}}
                  className="background-image w-full h-4/6"/>
            <div className="mt-4 w-28">
              <Button mode="primary" value={"В текст"}/>
            </div>
          </>
        }
      </div>
    </>
  );
};
