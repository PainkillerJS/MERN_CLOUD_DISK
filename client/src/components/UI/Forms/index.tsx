import "./styles.scss";

import { useRef, useState } from "react";
import type { MutableRefObject, MouseEventHandler } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks/reduxHooks";
import { AuthRegistration, AuthLogin } from "../../../features/Auth/action";
import { validateEmail } from "../../../helpers/validations/auth";
import { EFormType } from "../../types";

import { Input } from "../common/Input";
import { Button } from "../common/Btn";

interface IProps {
  inputName: MutableRefObject<string>;
  inputPassword: MutableRefObject<string>;
  error: string;
  onSendData: MouseEventHandler<Element>;
  isLoading: boolean;
}

const FormLogin = ({ inputName, inputPassword, onSendData, error, isLoading }: IProps) => (
  <form className="form__auth">
    <h3>Авторизация</h3>
    <Input error={error} inputValue={inputName} type="email" placeholder="Email" />
    <Input inputValue={inputPassword} type="password" placeholder="Пароль" />
    <Button text="Отправить" onClick={onSendData} disabled={isLoading} />
  </form>
);

const FormReg = ({ inputName, inputPassword, onSendData, error, isLoading }: IProps) => (
  <form className="form__reg">
    <h3>Регистрация</h3>
    <Input error={error} type="email" inputValue={inputName} placeholder="Email" />
    <Input inputValue={inputPassword} type="password" placeholder="Пароль" />
    <Button text="Отправить" onClick={onSendData} disabled={isLoading} />
  </form>
);

export const Forms = () => {
  const dispatch = useAppDispatch();
  const { action } = useParams();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.user);

  const inputName = useRef<string>("");
  const inputPassword = useRef<string>("");
  const [error, setError] = useState<string>("");

  const onSendData: MouseEventHandler = async (e) => {
    e.preventDefault();
    const errorValid = validateEmail(inputName.current);

    if (errorValid) {
      return setError(errorValid);
    } else if (error) {
      setError("");
    }

    action === EFormType.FORM_REG
      ? dispatch(AuthRegistration({ email: inputName.current, password: inputPassword.current }))
      : dispatch(AuthLogin({ email: inputName.current, password: inputPassword.current }));
  };

  const changeForms = (type: EFormType) => () => navigate(`/${type}`);

  const props: IProps = {
    inputName,
    inputPassword,
    error,
    onSendData,
    isLoading
  };

  return (
    <>
      {action === EFormType.FORM_REG && <FormReg {...props} />}
      {action === EFormType.FORM_LOGIN && <FormLogin {...props} />}
      <div className="form__footer">
        {action === EFormType.FORM_REG ? (
          <>
            Уже имеете аккаунт?
            <span onClick={changeForms(EFormType.FORM_LOGIN)}>Войти</span>
          </>
        ) : (
          <>
            Нет аккаунта?
            <span onClick={changeForms(EFormType.FORM_REG)}>Регистрация</span>
          </>
        )}
      </div>
    </>
  );
};
