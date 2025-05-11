import {Button} from "../../../UI/Button/Button.jsx";
import {Link} from "react-router-dom";
import {useUser} from "../../../../hooks/useUser.js";
import { assetPath } from "../../../../models/consts.js";

export const PhotoDescSection = () => {
  const {user} = useUser();

  return (
    <>
      <div className="flex mt-40">
        <div className="w-1/2 p-10 flex flex-col items-center justify-center">
          <img src={`${assetPath}/photo/photo_desc.png`} alt=""/>
        </div>

        <div className=" ml-2 w-5/12 flex flex-col items-center justify-center"
             style={{height: "85vh"}}>
          <div className="text-2xl text-center font-medium mb-20">
            Это уникальное решение, разработанное специально для добавления тифлокомментариев к фото и видео. Наше
            приложение поможет вам создать невидимые мосты в мире зрительного искусства для тех, кто испытывает проблемы
            со зрением.
          </div>

          <div className="text-2xl text-center font-medium mb-20">
            Легкость в создании и редактировании комментариев с использованием передовых технологий искусственного
            интеллекта.
          </div>

          {user.isLoggedIn &&
            <Link to="/project/photo">
              <Button value="Перейти к работе с фото" mode="primary"/>
            </Link>
          }
        </div>
      </div>
    </>
  );
}
