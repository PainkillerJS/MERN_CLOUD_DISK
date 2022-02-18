import "./styles.scss";

import type { ChangeEventHandler, Dispatch, InputHTMLAttributes, SetStateAction } from "react";

interface IProps extends Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder"> {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error?: string;
  onChangeCustom?: (name: string) => void;
}

export const Input = ({ type, placeholder, error, setValue, value, onChangeCustom }: IProps) => {
  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    setValue(currentTarget.value);
    onChangeCustom && onChangeCustom(currentTarget.value);
  };

  return (
    <div className="input__wrapper">
      <input
        className={`input ${error ? "error" : ""}`}
        value={value}
        onChange={handleChangeValue}
        type={type}
        placeholder={placeholder}
        autoComplete="on"
      />
      {error && (
        <div className="input__error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
