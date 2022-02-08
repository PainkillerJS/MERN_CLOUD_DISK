import { useState, useRef } from "react";
import type { MouseEventHandler } from "react";

import { useParams } from "react-router-dom";

import { AuthRegistration, AuthLogin } from "../../../../features/Auth/action";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/reduxHooks";
import { validateEmail } from "../../../../helpers/validations/auth";
import { EFormType } from "../../../types";
import { Input } from "../../common/Input";
import { Button } from "../../common/Btn";

const errorsFromServer = ["email", "password"];

export const Form = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);
  const { action } = useParams();

  const inputNameRef = useRef<string>("");
  const inputPasswordRef = useRef<string>("");
  const [error, setError] = useState({ type: "", value: "" });

  const onSendData: MouseEventHandler = async (e) => {
    e.preventDefault();
    const errorValid = validateEmail(inputNameRef.current);

    if (errorValid) {
      return setError({ type: "email", value: errorValid });
    } else if (error) {
      setError({ type: "", value: "" });
    }

    const { payload } = (
      action === EFormType.FORM_REG
        ? await dispatch(AuthRegistration({ email: inputNameRef.current, password: inputPasswordRef.current }))
        : await dispatch(AuthLogin({ email: inputNameRef.current, password: inputPasswordRef.current }))
    ) as { payload: { email: string; password: string } };

    if (errorsFromServer.includes(Object.keys(payload)[0])) {
      const [[type, value]] = Object.entries(payload);
      setError({ type, value });
    }
  };

  return (
    <form>
      <h3>{action === EFormType.FORM_REG ? "Регистрация" : "Авторизация"}</h3>
      <Input error={error.type === "email" ? error.value : ""} inputValue={inputNameRef} type="email" placeholder="Email" />
      <Input error={error.type === "password" ? error.value : ""} inputValue={inputPasswordRef} type="password" placeholder="Пароль" />
      <Button text="Отправить" onClick={onSendData} disabled={isLoading} />
    </form>
  );
};
