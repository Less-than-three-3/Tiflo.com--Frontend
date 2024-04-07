import {AuthPage} from "./AuthPage.jsx";
import {useRef, useState} from "react";
import {RegPage} from "./RegPage.jsx";

export const AuthRegContainer = ({isRegistration, setIsRegistration}) => {
  const btnRef = useRef(null);
  const pictureContainerRef = useRef(null);
  const inputContainerRef = useRef(null);

  const handleClick = () => {
    console.log("click")
    pictureContainerRef.current.classList.toggle('active');
    inputContainerRef.current.classList.toggle('active');
  };

  return (
    <>
      <div className="w-full h-full flex justify-center mt-20">
        <div className="w-1/2 h-5/6 rounded-2xl bg-center bg-no-repeat bg-cover flex flex-row"
             style={{backgroundImage: "url(/src/assets/photo/purple.jpg)"}}>

          <div className="w-full h-full backdrop-blur-2xl flex justify-center items-end">
            <div className="w-1/2 p-16 pictureContainer" ref={pictureContainerRef}>
              Создавайте проекты с авто-генерацией тифлокомментариев и удобными инструментами для их редактирования
            </div>

            <div className="w-1/2 h-full bg-raccoon p-20 rounded-md flex flex-col justify-between inputContainer"
                 ref={inputContainerRef}>

              {isRegistration ?
                <RegPage setIsRegistration={setIsRegistration} btnRef={btnRef} switchHandler={handleClick}/>
                :
                <AuthPage setIsRegistration={setIsRegistration} btnRef={btnRef} switchHandler={handleClick}/>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
