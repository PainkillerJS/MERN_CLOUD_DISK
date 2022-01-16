import "./styles.scss";

import type { ButtonHTMLAttributes } from "react";

interface IProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  text: string;
}

export const Button = ({ text, onClick }: IProps) => {
  return <button onClick={onClick}>{text}</button>;
};
