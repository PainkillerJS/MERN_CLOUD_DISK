import "./styles.scss";
import Logo from "../../../assets/logo.png";

import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../store/hooks/reduxHooks";
import { logOut } from "../../../features/Auth/slice/userSlice";
import { EFormType } from "../../types";

export const Header = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();

  const logOutProfile = () => dispatch(logOut());

  return (
    <div className="header">
      <div className="header__logo">
        <img src={Logo} alt="Logo" />
        <span>Диск</span>
      </div>
      <div className="header__panelOptions">
        {!isAuth && (
          <>
            <Link to={`/auth/${EFormType.FORM_LOGIN}`}>Вход</Link>
            <Link to={`/auth/${EFormType.FORM_REG}`}>Регистрация</Link>
          </>
        )}

        {isAuth && <span onClick={logOutProfile}>Выход</span>}
      </div>
    </div>
  );
};
