import {useRef, useState} from "react";
import {Button} from "../../UI/Button/Button.jsx";
import axios from "axios";

export const PhotoEditor = ({project, setProject}) => {
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = (event) => {
    const uploadedFIle = event.target.files[0];
    console.log(uploadedFIle)
    setFile(uploadedFIle);

    // axios.postForm('http://89.208.231.158/api/save-image', {
    //   file: uploadedFIle,
    // })
    //   .then((response) => {
    //     console.log(response)
    //   })

    setProject({
      id: "1",
      name: project.name,
      photo: URL.createObjectURL(uploadedFIle),
      text: ""
    })
  };

  const toText = () => {
    //   TODO перевод в текст
    setTimeout(() => {
      setProject({
        id: project.id,
        name: project.name,
        photo: project.photo,
        text: "На изображении показана группа из шести астронавтов, стоящих на скалистой снежной поверхности, возможно, " +
          "на горе или скале. Все они носят белые костюмы, что говорит о том, что они являются частью космической миссии" +
          " или исследовательской команды. Астронавты расположены в различных местах, а некоторые стоят ближе к переднему " +
          "плану, а другие - дальше, создавая ощущение глубины и масштабирования в сцене."
      })
    }, 0)
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
            <img src={project.photo} alt=""/>
            <div className="mt-4">
              <Button value={"В текст"} onClick={toText}/>
            </div>
          </>
        }
      </div>
    </>
  );
};
