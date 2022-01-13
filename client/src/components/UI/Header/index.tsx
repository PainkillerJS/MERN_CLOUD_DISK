import "./styles.scss";
import Logo from "../../../assets/logo.png";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img src={Logo} alt="Logo" />
        <span>Диск</span>
      </div>
      <div className="header__panelOptions">
        <span>Вход</span>
        <span>Регистрация</span>
      </div>
    </div>
  );
};
