import {Input} from "../../UI/Input/Input.jsx";
import {Button} from "../../UI/Button/Button.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../../../hooks/useUser.js";
import {api} from "../../../api/api.js";
import {onboarding} from "../../../models/onboarding.js";
import {validate, validatePassword} from "../../../utils/validation.js";

export const RegForm = () => {
  const {setUser, openOnboarding} = useUser();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [validationErr, setValidationErr] = useState("");

  const navigate = useNavigate();

  const reg = async () => {
    if (!validate(login, {
      minLen: 4,
      maxLen: 20,
      allowRu: true,
    })) {
      setValidationErr("Логин должен быть от 4 до 20 символов в длину");
      return;
    }

    if (!validatePassword(password) && !validatePassword(passwordRepeat)) {
      setValidationErr("Пароль должен быть от 6 до 20 символов, состоять из английских букв, цифр и служебных знаков");
      return;
    }

    if (password !== passwordRepeat) {
      setValidationErr("Пароли не совпадают");
      return;
    }

    const regResponse = await api.signUp(login, password);
    if (regResponse.status === 201) {
      const authResponse = await api.signIn(login, password);

      if (authResponse.status === 200) {
        setUser({
          id: authResponse.data.userId,
          login: authResponse.data.login,
          isLoggedIn: true,
        })

        onboarding.clearOnboarding();
        navigate("/");
        openOnboarding();
      }
    } else {
      setValidationErr("Такой пользователь уже существует");
    }
  }

  return (
    <>
      <div style={{height: "25em"}}>
        <div className="text-2xl mb-8">Создание аккаунта</div>
        <div>
          <div>Логин*</div>
          <Input placeholder="Введите логин"
                 value={login}
                 handler={setLogin}/>
        </div>
        <div>
          <div>Пароль*</div>
          <Input placeholder="Введите пароль"
                 value={password}
                 handler={setPassword}
                 type="password"/>
        </div>
        <div>
          <div>Повторите пароль*</div>
          <Input placeholder="Введите пароль повторно"
                 value={passwordRepeat}
                 handler={setPasswordRepeat}
                 type="password"/>
        </div>
      </div>

      <div>
        <div className="text-rose-600 text-sm min-h-16 text-center text-pretty">{validationErr}</div>

        <Button value="Создать аккаунт" onClick={reg} mode="primary"/>

        <div className="w-full mt-4 flex justify-center">
          Уже есть аккаунт?
          <Link className="underline underline-offset-4 text-purple ml-1" to="/auth/signIn">
            Вход в аккаунт
          </Link>
        </div>
      </div>
    </>
  );
}
