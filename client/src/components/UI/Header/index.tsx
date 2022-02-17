import "./styles.scss";

import { HeaderLogo } from "./components/HeaderLogo";
import { HeaderPanel } from "./components/HeaderPanel";

export const Header = () => {
  return (
    <div className="header">
      <HeaderLogo />
      <HeaderPanel />
    </div>
  );
};
