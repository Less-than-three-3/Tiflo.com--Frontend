import {Button} from "../../UI/Button/Button.jsx";

export const Topbar = () => {
  return (
    <>
      <div className="section flex items-center justify-between px-10 py-6">

        <div>Tiflo.com</div>
        <div>Проект: белка акробат</div>
        <div className="flex">
          <img src="/src/assets/icons/user.svg" alt="user"
               className="w-10"/>
          <img src="/src/assets/icons/share.svg" alt="share"
               className="w-10"/>
          <Button/>
        </div>

      </div>
    </>
  );
}
