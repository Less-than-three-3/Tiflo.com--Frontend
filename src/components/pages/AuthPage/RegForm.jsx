import {Input} from "../../UI/Input/Input.jsx";
import {Button} from "../../UI/Button/Button.jsx";
import {useState} from "react";
import axios from "axios";
import {host} from "../../../models/consts.js";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../../../hooks/useUser.js";

export const RegForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const {setUser} = useUser();

  const navigate = useNavigate();

  const reg = async () => {
    const regResponce = await axios.post(`${host}/api/auth/signUp`, {
      login: login,
      password: password,
    })
    console.log(regResponce);

    if (regResponce.status === 200) {
      const authResponse = await axios.post(`${host}/api/auth/signIn`, {
        login: login,
        password: password,
      })

      if (authResponse.status === 200) {
        setUser({
          id: authResponse.data.userId,
          login: authResponse.data.login,
          isLoggedIn: true,
        })

        navigate("/project/photo")

        axios.get(`${host}/api/projects`)
          .then((response) => {
            console.log(response.data)
          })
      }
    }
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
      <div className="w-full flex justify-center">
        Уже есть аккаунт?
        <Link className="underline underline-offset-4 text-purple ml-1" to="/auth/signIn">
          Вход в аккаунт
        </Link>
      </div>
    </>
  );
}
