import {Divider} from "../../../UI/Divider/Divider.jsx";
import {Button} from "../../../UI/Button/Button.jsx";

export const WelcomeSection = () => {
  return (
    <>
      <div className="flex">
        <div className="section ml-2 w-5/12 flex flex-col items-center justify-center"
             style={{height: "85vh"}}>
          <div className="text-5xl font-semibold text-center mb-40">
            Добро пожаловать в Tiflo
          </div>
          <div className="text-2xl font-bold italic text-center">
            Вместе мы сделаем искусство видимым для каждого, преображая мир видео и фотографии в аудио рассказ
          </div>
        </div>

        <div className="w-1/2 p-10 flex flex-col items-center justify-center">
          <img src="/src/assets/photo/interstellar.png" alt=""
               className="w-8/12 mb-20"/>

          <Divider/>

          <div className="w-full text-center text-pretty p-6">
            На изображении показана группа из четырех астронавтов, стоящих на скалистой снежной поверхности, возможно, на
            горе или скале. Все они носят белые костюмы, что говорит о том, что они являются частью космической мисси и
            или исследовательской команды. Астронавты расположены в различных местах, а некоторые стоят ближе к
            переднему плану, а другие - дальше, создавая ощущение глубины и масштабирования в сцене
          </div>

          <Divider/>

          <div className="mt-6">
            <Button value="Озвучить" mode="primary"/>
          </div>
        </div>
      </div>
    </>
  );
}
