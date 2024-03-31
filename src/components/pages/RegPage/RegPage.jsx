import {Input} from "../../UI/Input/Input.jsx";
import {Button} from "../../UI/Button/Button.jsx";
import {useState} from "react";
import axios from "axios";
import {host} from "../../../models/consts.js";

export const RegPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const reg = () => {
    axios.post(`${host}/api/auth/signUp`, {
      login: login,
      password: password,
    })
      .then((res) => console.log(res))
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-5/12 bg-raccoon p-12 rounded-2xl">
          <Input placeholder="Введите логин" value={login} handler={setLogin}/>
          <Input placeholder="Введите пароль" value={password} handler={setPassword}/>
          <Button value="SignUp" onClick={reg} mode="primary"/>
        </div>
      </div>
    </>
  );
}
