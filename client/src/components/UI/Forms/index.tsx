import "./styles.scss";

import { useRef, useState } from "react";
import type { MutableRefObject, MouseEventHandler } from "react";
import { useParams } from "react-router-dom";

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
  errorServer: string;
  isLoading: boolean;
}

const FormLogin = ({ inputName, inputPassword, onSendData, error, errorServer, isLoading }: IProps) => (
  <form className="form__auth">
    <h3>Авторизация</h3>
    <Input error={error} errorServer={errorServer} inputValue={inputName} type="email" placeholder="Email" />
    <Input errorServer={errorServer} inputValue={inputPassword} type="password" placeholder="Пароль" />
    <Button text="Отправить" onClick={onSendData} disabled={isLoading} />
  </form>
);

const FormReg = ({ inputName, inputPassword, onSendData, error, errorServer, isLoading }: IProps) => (
  <form className="form__reg">
    <h3>Регистрация</h3>
    <Input errorServer={errorServer} error={error} type="email" inputValue={inputName} placeholder="Email" />
    <Input errorServer={errorServer} inputValue={inputPassword} type="password" placeholder="Пароль" />
    <Button text="Отправить" onClick={onSendData} disabled={isLoading} />
  </form>
);

export const Forms = () => {
  const { action } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, error: errorServer } = useAppSelector((state) => state.user);

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

  const props: IProps = {
    inputName,
    inputPassword,
    error,
    onSendData,
    isLoading,
    errorServer
  };

  return (
    <>
      {action === EFormType.FORM_REG && <FormReg {...props} />}
      {action === EFormType.FORM_LOGIN && <FormLogin {...props} />}
    </>
  );
};
