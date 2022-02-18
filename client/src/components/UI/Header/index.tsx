import "./styles.scss";

import { useAppDispatch } from "../../../store/hooks/reduxHooks";
import { HeaderLogo } from "./components/HeaderLogo";
import { HeaderPanel } from "./components/HeaderPanel";
import { HeaderSearch } from "./components/HeaderSearch";

export const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="header">
      <HeaderLogo />
      <HeaderSearch dispatch={dispatch} />
      <HeaderPanel dispatch={dispatch} />
    </div>
  );
};
