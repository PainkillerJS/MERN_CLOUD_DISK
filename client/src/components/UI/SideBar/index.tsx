import "./styles.scss";

import { useRef, memo } from "react";

import { CreateFileModal } from "./components/CreateFileModal";
import { Button } from "../common/Btn";

export const SideBar = memo(() => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleShowCreateModal = () => sidebarRef.current?.querySelector(".modal")?.classList.toggle("active");

  return (
    <div className="sidebar" ref={sidebarRef}>
      <Button onClick={toggleShowCreateModal} text="Создать" className="sidebar__button" />
      <CreateFileModal callbackCloseModal={toggleShowCreateModal} />
    </div>
  );
});
