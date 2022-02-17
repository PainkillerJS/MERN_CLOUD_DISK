import Logo from "../../../../assets/logo.png";

export const HeaderLogo = () => {
  return (
    <div className="header__logo">
      <img src={Logo} alt="Logo" />
      <span>Диск</span>
    </div>
  );
};
