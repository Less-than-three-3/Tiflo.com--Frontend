import {Outlet, useLocation} from "react-router-dom";
import {useEffect} from "react";

export const AuthRegContainer = ({pictureContainerRef, inputContainerRef}) => {
  const location = useLocation();
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
      <div className="w-full h-full flex justify-center mt-20">
        <div className="w-1/2 h-5/6 rounded-2xl bg-center bg-no-repeat bg-cover flex flex-row"
             style={{backgroundImage: "url(/src/assets/photo/purple.jpg)"}}>

          <div className="w-full h-full backdrop-blur-2xl flex justify-center items-end">
            <div className="w-1/2 p-16 pictureContainer" ref={pictureContainerRef}>
              Создавайте проекты с авто-генерацией тифлокомментариев и удобными инструментами для их редактирования
            </div>

            <div className="w-1/2 h-full bg-raccoon p-20 rounded-md flex flex-col justify-between inputContainer"
                 ref={inputContainerRef}>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
