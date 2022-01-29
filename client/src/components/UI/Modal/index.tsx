import "./styles.scss";

import { useEffect } from "react";
import type { FC } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../store/hooks/reduxHooks";

export const Modal: FC = ({ children }) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    isAuth && navigate("/");
  }, [isAuth]);

  return (
    <div className="modal">
      <div className="modal__window">
        <Link className="modal__close" to="/">
          &times;
        </Link>
        {children}
      </div>
    </div>
  );
};
