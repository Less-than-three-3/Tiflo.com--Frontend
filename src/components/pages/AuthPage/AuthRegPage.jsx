import {Outlet, useLocation} from "react-router-dom";
import {useEffect, useRef} from "react";
import { assetPath } from "../../../models/consts";

export const AuthRegPage = () => {
  const location = useLocation();

  const pictureContainerRef = useRef(null);
  const inputContainerRef = useRef(null);

  useEffect(() => {
    if (location.pathname === "/auth/signIn") {
      pictureContainerRef.current.classList.remove('active');
      inputContainerRef.current.classList.remove('active');
    }
    if (location.pathname === "/auth/signUp") {
      pictureContainerRef.current.classList.add('active');
      inputContainerRef.current.classList.add('active');
    }
  }, [inputContainerRef, location.pathname, pictureContainerRef])

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="w-1/2 rounded-2xl bg-center bg-no-repeat bg-cover flex flex-row"
             style={{backgroundImage: `url(${assetPath}/photo/purple_blur_2.jpg)`}}>

          <div className="flex justify-center items-end">
            <div className="w-1/2 p-16 pictureContainer" ref={pictureContainerRef}>
              Создавайте проекты с авто-генерацией тифлокомментариев и удобными инструментами для их редактирования
            </div>

            <div className="w-1/2 bg-raccoon p-20 rounded-2xl flex flex-col justify-between inputContainer"
                 ref={inputContainerRef}>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
