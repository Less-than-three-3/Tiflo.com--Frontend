import {Button} from "../../UI/Button/Button.jsx";

export const Topbar = () => {
  return (
    <>
      <div id="topbar" className="section flex items-center justify-between px-10 py-6 font-bold">
        <div className="text-2xl">Tiflo.com</div>
        <div className="text-xl">Проект: белка акробат</div>
        <div className="flex gap-6">
          <img src="/src/assets/icons/user.svg" alt="user"
               className="w-10"/>
          <img src="/src/assets/icons/share.svg" alt="share"
               className="w-9"/>
          <Button/>
        </div>
      </div>
    </>
  );
}
