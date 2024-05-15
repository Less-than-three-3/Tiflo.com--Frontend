import {Button} from "../../../UI/Button/Button.jsx";
import {Link} from "react-router-dom";

export const PhotoDescSection = () => {
  return (
    <>
      <div className="flex mt-40">
        <div className="w-1/2 p-10 flex flex-col items-center justify-center">
          <img src="/src/assets/photo/photo_desc.png" alt=""/>
        </div>

        <div className="section ml-2 w-5/12 flex flex-col items-center justify-center"
             style={{height: "85vh"}}>
          <div className="text-2xl text-center font-semibold mb-20">
            Это уникальное решение, разработанное специально для добавления тифлокомментариев к фото и видео. Наше
            приложение поможет вам создать невидимые мосты в мире зрительного искусства для тех, кто испытывает проблемы
            со зрением.
          </div>

          <div className="text-2xl text-center font-semibold mb-20">
            Легкость в создании и редактировании комментариев с использованием передовых технологий искусственного
            интеллекта.
          </div>

          <Link to="/project/photo">
            <Button value="Перейти к работе с фото" mode="primary"/>
          </Link>
        </div>
      </div>
    </>
  );
}
