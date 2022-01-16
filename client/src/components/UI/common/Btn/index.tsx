import "./styles.scss";

import type { ButtonHTMLAttributes } from "react";

interface IProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled"> {
  text: string;
}

export const Button = ({ text, onClick, disabled }: IProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
