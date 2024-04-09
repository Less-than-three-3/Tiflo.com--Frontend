import {Input} from "../../UI/Input/Input.jsx";
import {Button} from "../../UI/Button/Button.jsx";
import axios from "axios";
import {host} from "../../../models/consts.js";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export const AuthForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const auth = () => {
    axios.post(`${host}/api/auth/signIn`, {
      login: login,
      password: password,
    })
      .then((res) => console.log(res))
  }

  return (
    <>
      <div>
        <div className="text-2xl mb-10">Вход в аккаунт</div>
        <div>
          <div>Логин*</div>
          <Input placeholder="Введите логин" value={login} handler={setLogin}/>
        </div>
        <div className="">
          <div>Пароль*</div>
          <Input placeholder="Введите пароль" value={password} handler={setPassword} type="password"/>
        </div>
      </div>

      <div>
        <Button value="Войти в аккаунт" onClick={auth} mode="primary"/>
        <div className="w-full flex justify-center">
          Нет аккаунта?
          <Link className="underline underline-offset-4 text-purple ml-1" to="/auth/signUp">
            Регистрация
          </Link>
        </div>
      </div>
    </>
  );
}
