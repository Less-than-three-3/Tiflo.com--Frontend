import {useEffect, useRef, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import {useProject} from "../../../hooks/useProject.js";

export const PhotoEditor = () => {
  const {project, setProjectMedia, setProjectText} = useProject();
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = (event) => {
    const uploadedFIle = event.target.files[0];
    setFile(uploadedFIle);

    setProjectMedia(URL.createObjectURL(uploadedFIle));
    setTimeout(() => {
      console.log(project)

    }, 100)
  };

  const toText = () => {
    //   TODO перевод в текст
    setProjectText("На изображении показана группа из шести астронавтов, стоящих на скалистой снежной поверхности, возможно, " +
      "на горе или скале. Все они носят белые костюмы, что говорит о том, что они являются частью космической миссии" +
      " или исследовательской команды. Астронавты расположены в различных местах, а некоторые стоят ближе к переднему " +
      "плану, а другие - дальше, создавая ощущение глубины и масштабирования в сцене.")
  }

  return (
    <>
      <div className="section grow">
        {!project.id ?
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
              <Button mode="primary" value={"В текст"} onClick={toText}/>
            </div>
          </>
        }
      </div>
    </>
  );
};
