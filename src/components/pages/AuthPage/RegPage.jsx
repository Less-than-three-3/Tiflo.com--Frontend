import {Input} from "../../UI/Input/Input.jsx";
import {Button} from "../../UI/Button/Button.jsx";
import {useState} from "react";
import axios from "axios";
import {host} from "../../../models/consts.js";
import {Link, useNavigate} from "react-router-dom";

export const RegPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const reg = () => {
    axios.post(`${host}/api/auth/signUp`, {
      login: login,
      password: password,
    })
      .then((res) => console.log(res))
  }

  return (
    <>
      <div>
        <div className="text-2xl mb-8">Создание аккаунта</div>
        <div>
          <div>Логин*</div>
          <Input placeholder="Введите логин" value={login} handler={setLogin}/>
        </div>
        <div>
          <div>Пароль*</div>
          <Input placeholder="Введите пароль" value={password} handler={setPassword} type="password"/>
        </div>
        <div>
          <div>Повторите пароль*</div>
          <Input placeholder="Введите пароль повторно" value={passwordRepeat} handler={setPasswordRepeat}
                 type="password"/>
        </div>
      </div>

      <Button value="Создать аккаунт" onClick={reg} mode="primary"/>
      <div className="w-full flex justify-center mt-8">
        Уже есть аккаунт?
        <Link className="underline underline-offset-4 text-purple ml-1" to="/auth/signIn">
          Вход в аккаунт
        </Link>
      </div>
    </>
  );
}
