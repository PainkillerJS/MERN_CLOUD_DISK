import "./styles.scss";

import { useState, useEffect } from "react";
import type { ChangeEventHandler, MutableRefObject, InputHTMLAttributes } from "react";

interface IProps extends Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder"> {
  inputValue: MutableRefObject<string>;
  error?: string;
}

export const Input = ({ inputValue, type, placeholder, error }: IProps) => {
  const [value, setValue] = useState<string>("");

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    setValue(currentTarget.value);
    inputValue.current = currentTarget.value;
  };

  useEffect(() => {
    setValue(inputValue.current);
  }, [inputValue.current]);

  return (
    <div className="input__wrapper">
      <input className={`input ${error ? "error" : ""}`} value={value} onChange={handleChangeValue} type={type} placeholder={placeholder} />
      {error && (
        <div className="input__error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
