import {Input} from "../../UI/Input/Input.jsx";
import {Button} from "../../UI/Button/Button.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../../../hooks/useUser.js";
import {api} from "../../../api/api.js";

export const RegForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const {setUser} = useUser();
  const navigate = useNavigate();

  const reg = async () => {
    const regResponse = await api.signUp(login, password);

    if (regResponse.status === 201) {
      const authResponse = await api.signIn(login, password);

      if (authResponse.status === 200) {
        setUser({
          id: authResponse.data.userId,
          login: authResponse.data.login,
          isLoggedIn: true,
        })

        navigate("/")
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

      <div>
        <Button value="Создать аккаунт" onClick={reg} mode="primary"/>
        <div className="w-full flex justify-center">
          Уже есть аккаунт?
          <Link className="underline underline-offset-4 text-purple ml-1" to="/auth/signIn">
            Вход в аккаунт
          </Link>
        </div>
      </div>
    </>
  );
}
