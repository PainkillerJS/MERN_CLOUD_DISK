import "./styles.scss";

import { memo } from "react";
import type { ButtonHTMLAttributes } from "react";

interface IProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled" | "className"> {
  text: string;
}

export const Button = memo(({ text, onClick, disabled, className }: IProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {text}
    </button>
  );
});
