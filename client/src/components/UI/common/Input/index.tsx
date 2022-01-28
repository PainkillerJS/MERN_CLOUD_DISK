import "./styles.scss";

import { useState } from "react";
import type { ChangeEventHandler, MutableRefObject, InputHTMLAttributes } from "react";

interface IProps extends Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder"> {
  inputValue: MutableRefObject<string>;
  error?: string;
  errorServer?: string;
}

export const Input = ({ inputValue, type, placeholder, error, errorServer }: IProps) => {
  const [value, setValue] = useState<string>("");
  const errorText = error || errorServer;

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    setValue(currentTarget.value);
    inputValue.current = currentTarget.value;
  };

  return (
    <div className="input__wrapper">
      <input
        className={`input ${errorText ? "error" : ""}`}
        value={value}
        onChange={handleChangeValue}
        type={type}
        placeholder={placeholder}
      />
      {errorText && (
        <div className="input__error">
          <span>{errorText}</span>
        </div>
      )}
    </div>
  );
};
