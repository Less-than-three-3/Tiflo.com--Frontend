import {useRef, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";

export const PhotoEditor = ({projectId, setProjectId, setText}) => {
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();
  const [filepath, setFilepath] = useState("");

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = (event) => {
    setFile(event.target.files[0]);
    setFilepath(URL.createObjectURL(event.target.files[0]));
    setProjectId("1")
  };

  const toText = () => {
    //   TODO перевод в текст
    setTimeout(() => {
      setText("На изображении показана группа из шести астронавтов, стоящих на скалистой снежной поверхности, возможно, " +
        "на горе или скале. Все они носят белые костюмы, что говорит о том, что они являются частью космической миссии" +
        " или исследовательской команды. Астронавты расположены в различных местах, а некоторые стоят ближе к переднему " +
        "плану, а другие - дальше, создавая ощущение глубины и масштабирования в сцене.")
    }, 0)
  }

  return (
    <>
      <div className="section grow">
        {!projectId ?
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
            {/*<div className="font-bold pb-8">Фото: {project.name}</div>*/}
            <img src={filepath} alt=""/>
            <div className="mt-4">
              <Button value={"В текст"} onClick={toText}/>
            </div>
          </>
        }
      </div>
    </>
  );
};
