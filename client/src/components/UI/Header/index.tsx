import "./styles.scss";
import Logo from "../../../assets/logo.png";

import { Link } from "react-router-dom";

import { EFormType } from "../../types";

export const Header = () => (
  <div className="header">
    <div className="header__logo">
      <img src={Logo} alt="Logo" />
      <span>Диск</span>
    </div>
    <div className="header__panelOptions">
      <Link to={`/auth/${EFormType.FORM_LOGIN}`}>Вход</Link>
      <Link to={`/auth/${EFormType.FORM_REG}`}>Регистрация</Link>
    </div>
  </div>
);
