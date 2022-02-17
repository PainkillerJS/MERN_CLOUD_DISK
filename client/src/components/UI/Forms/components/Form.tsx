import { useState, useEffect } from "react";
import type { MouseEventHandler } from "react";

import { AuthRegistration, AuthLogin } from "../../../../features/Auth/action";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/reduxHooks";
import { validateEmail } from "../../../../helpers/validations/auth";
import { EFormType } from "../../../types";
import { Input } from "../../common/Input";
import { Button } from "../../common/Btn";

const errorsFromServer = ["email", "password"];

interface IProps {
  action?: string;
}

export const Form = ({ action }: IProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState({ type: "", value: "" });

  const onSendData: MouseEventHandler = async (e) => {
    e.preventDefault();
    const errorValid = validateEmail(email);

    if (errorValid) {
      return setError({ type: "email", value: errorValid });
    } else if (error) {
      setError({ type: "", value: "" });
    }

    const { payload } = (
      action === EFormType.FORM_REG ? await dispatch(AuthRegistration({ email, password })) : await dispatch(AuthLogin({ email, password }))
    ) as { payload: { email: string; password: string } };

    if (errorsFromServer.includes(Object.keys(payload)[0])) {
      const [[type, value]] = Object.entries(payload);
      setError({ type, value });
    }
  };

  useEffect(() => {
    setPassword("");
    setEmail("");
  }, [action]);

  return (
    <>
      <Input error={error.type === "email" ? error.value : ""} value={email} setValue={setEmail} type="email" placeholder="Email" />
      <Input
        error={error.type === "password" ? error.value : ""}
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Пароль"
      />
      <Button text="Отправить" onClick={onSendData} disabled={isLoading} />
    </>
  );
};
