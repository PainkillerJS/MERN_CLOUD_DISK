import "./styles.scss";

import { useRef } from "react";
import type { MutableRefObject, MouseEventHandler } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks/reduxHooks";
import { AuthRegistration, AuthLogin } from "../../../features/Auth/action";
import { EFormType } from "../../types";

import { Input } from "../common/Input";
import { Button } from "../common/Btn";

interface IProps {
  inputName: MutableRefObject<string>;
  inputPassword: MutableRefObject<string>;
  sendData: MouseEventHandler<Element>;
}

const FormLogin = ({ inputName, inputPassword, sendData }: IProps) => {
  return (
    <form className="form__auth">
      <h3>Авторизация</h3>
      <Input inputValue={inputName} placeholder="Email" />
      <Input inputValue={inputPassword} type="password" placeholder="Пароль" />
      <Button text="Отправить" onClick={sendData} />
    </form>
  );
};

const FormReg = ({ inputName, inputPassword, sendData }: IProps) => {
  const { loading } = useAppSelector((state) => state.user);

  return (
    <form className="form__reg">
      <h3>Регистрация</h3>
      <Input inputValue={inputName} placeholder="Email" />
      <Input inputValue={inputPassword} type="password" placeholder="Пароль" />
      <Button text="Отправить" onClick={sendData} disabled={loading} />
    </form>
  );
};

export const Forms = () => {
  const { action } = useParams();
  const dispatch = useAppDispatch();

  const inputName = useRef<string>("");
  const inputPassword = useRef<string>("");

  const regUser: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(AuthRegistration({ email: inputName.current, password: inputPassword.current }));
  };

  const login: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(AuthLogin({ email: inputName.current, password: inputPassword.current }));
  };

  const props: IProps = {
    inputName,
    inputPassword,
    sendData: action === EFormType.FORM_REG ? regUser : login
  };

  return (
    <>
      {action === EFormType.FORM_REG && <FormReg {...props} />}
      {action === EFormType.FORM_LOGIN && <FormLogin {...props} />}
    </>
  );
};
