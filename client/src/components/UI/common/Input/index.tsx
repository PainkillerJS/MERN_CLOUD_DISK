import "./styles.scss";

import { useState } from "react";
import type { ChangeEventHandler, MutableRefObject, InputHTMLAttributes } from "react";

interface IProps extends Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder"> {
  inputValue: MutableRefObject<string>;
}

export const Input = ({ inputValue, type, placeholder }: IProps) => {
  const [value, setValue] = useState<string>("");

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    setValue(currentTarget.value);
    inputValue.current = currentTarget.value;
  };

  return <input className="input" value={value} onChange={handleChangeValue} type={type} placeholder={placeholder} />;
};
