import "./styles.scss";

import { useRef } from "react";
import type { MutableRefObject, MouseEventHandler } from "react";
import { useParams } from "react-router-dom";

import { AuthRegistration } from "../../../features/Auth/action";
import { useAppDispatch } from "../../../store/hooks/reduxHooks";
import { EFormType } from "../../types";

import { Input } from "../common/Input";
import { Button } from "../common/Btn";

interface IProps {
  inputName: MutableRefObject<string>;
  inputPassword: MutableRefObject<string>;
  sendData: MouseEventHandler<Element>;
}

const FormLogin = ({ inputName, inputPassword }: IProps) => {
  return (
    <form className="form__auth">
      <h3>Авторизация</h3>
      <Input inputValue={inputName} placeholder="Email" />
      <Input inputValue={inputPassword} type="password" placeholder="Пароль" />
      <Button text="Отправить" />
    </form>
  );
};

const FormReg = ({ inputName, inputPassword, sendData }: IProps) => {
  return (
    <form className="form__reg">
      <h3>Регистрация</h3>
      <Input inputValue={inputName} placeholder="Email" />
      <Input inputValue={inputPassword} type="password" placeholder="Пароль" />
      <Button text="Отправить" onClick={sendData} />
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

  const props: IProps = {
    inputName,
    inputPassword,
    sendData: regUser
  };

  return (
    <>
      {action === EFormType.FORM_REG && <FormReg {...props} />}
      {action === EFormType.FORM_LOGIN && <FormLogin {...props} />}
    </>
  );
};
