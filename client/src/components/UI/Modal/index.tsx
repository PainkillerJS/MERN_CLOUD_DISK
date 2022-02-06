import "./styles.scss";

import { useEffect } from "react";
import type { ReactNode, MouseEventHandler } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../store/hooks/reduxHooks";

export interface IModalProps {
  children: ReactNode;
  callbackCloseModal?: () => void;
}

export const Modal = ({ children, callbackCloseModal }: IModalProps) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const navigate = useNavigate();

  const crossModal = callbackCloseModal ? (
    <div className="modal__close" onClick={callbackCloseModal}>
      &times;
    </div>
  ) : (
    <Link className="modal__close" to="/">
      &times;
    </Link>
  );

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => e.stopPropagation();

  useEffect(() => {
    isAuth && navigate("/");
  }, [isAuth]);

  return (
    <div className="modal" onClick={callbackCloseModal}>
      <div className="modal__window" onClick={stopPropagation}>
        {crossModal}
        {children}
      </div>
    </div>
  );
};
