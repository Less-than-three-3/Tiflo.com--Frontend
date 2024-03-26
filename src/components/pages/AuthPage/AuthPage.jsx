import {Input} from "../../UI/Input/Input.jsx";
import {Button} from "../../UI/Button/Button.jsx";

export const AuthPage = () => {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-5/12 bg-raccoon p-12 rounded-2xl">
          <Input placeholder="Username"/>
          <Input placeholder="Password"/>
          <Button value="SignIn" onClick={() => {}} mode="primary"/>
        </div>
      </div>
    </>
  );
}
