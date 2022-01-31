import "./styles.scss";

import { Button } from "../common/Btn";

export const SideBar = () => {
  return (
    <div className="sidebar">
      <Button onClick={() => console.log(1)} text="Создать" className="sidebar__button" />
    </div>
  );
};
