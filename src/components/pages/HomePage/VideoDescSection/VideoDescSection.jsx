import {Divider} from "../../../UI/Divider/Divider.jsx";
import {Button} from "../../../UI/Button/Button.jsx";
import {Link} from "react-router-dom";
import {useUser} from "../../../../hooks/useUser.js";

export const VideoDescSection = () => {
  const {user} = useUser();

  return (
    <>
      <div className="flex mt-40 mb-10">
        <div className=" ml-2 w-5/12 flex flex-col items-center justify-center"
             style={{height: "85vh"}}>
          <div className="text-2xl text-center font-medium mb-20">
            Тифлокомментарии — это аудиоописания сцен, действий, выражений лиц, жестов, важных для понимания сюжета
            деталей, которые видит зрячий зритель, но которые не описываются диалогами персонажей. Наше приложение
            поможет вам легко и просто создать такие комментарии.
          </div>

          <div className="text-2xl text-center font-medium mb-20">
            Подключайтесь к нам, чтобы сделать видео контент доступным для всех. Вместе мы сможем изменить мир к
            лучшему!
          </div>

          {user.isLoggedIn &&
            <Link to="/project/video">
              <Button value="Перейти к работе с видео" mode="primary"/>
            </Link>
          }
        </div>

        <div className="w-1/2 p-10 flex flex-col items-center justify-center">
          <img src="/src/assets/photo/video_desc.png" alt=""/>
        </div>
      </div>
    </>
  );
}
