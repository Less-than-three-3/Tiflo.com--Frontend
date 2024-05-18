import {Input} from "../../UI/Input/Input.jsx";
import {Button} from "../../UI/Button/Button.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../../../hooks/useUser.js";
import {api} from "../../../api/api.js";
import {validatePassword} from "../../../utils/validation.js";

export const AuthForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useUser();
  const navigate = useNavigate();
  const [validationErr, setValidationErr] = useState("");

  const auth = async () => {
    if (!validatePassword(password)) {
      setValidationErr("Пароль должен быть от 6 до 20 символов, состоять из английских букв, цифр и служебных знаков");
      return;
    }

    const signInRes = await api.signIn(login, password)
    if (signInRes.status === 200) {
      setUser({
        id: signInRes.data.userId,
        login: signInRes.data.login,
        isLoggedIn: true,
      })

      navigate("/");
    } else {
      setValidationErr("Неверный логин или пароль");
    }
  }

  return (
    <>
      <div style={{height: "25em"}}>
        <div className="text-2xl mb-10">Вход в аккаунт</div>
        <div>
          <div>Логин*</div>
          <Input placeholder="Введите логин" value={login} handler={setLogin}/>
        </div>
        <div>
          <div>Пароль*</div>
          <Input placeholder="Введите пароль" value={password} handler={setPassword} type="password"/>
        </div>
      </div>

      <div>
        <div className="text-rose-600 text-sm min-h-16 text-center text-pretty">{validationErr}</div>

        <Button value="Войти в аккаунт" onClick={auth} mode="primary"/>

        <div className="w-full mt-4 flex justify-center">
          Нет аккаунта?
          <Link className="underline underline-offset-4 text-purple ml-1" to="/auth/signUp">
            Регистрация
          </Link>
        </div>
      </div>
    </>
  );
}
