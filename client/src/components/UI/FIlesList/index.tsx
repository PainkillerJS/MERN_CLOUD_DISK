import "./styles.scss";

import { CurrentDirContext } from "../../context/CurrentDirContext";
import { useAppSelector } from "../../../store/hooks/reduxHooks";
import { HeaderTable } from "./components/HeaderTable";
import { BackBtn } from "../BackBtn";
import { File } from "../common/FIle";
import { SideBar } from "../SideBar";

export const Files = () => {
  const files = useAppSelector((state) => state.files.files).map(({ name, size, type, date, _id }) => (
    <File key={name} name={name} size={size} type={type} date={date} _id={_id} />
  ));

  return (
    <CurrentDirContext>
      <div className="files">
        <SideBar />
        <div className="files__list">
          <BackBtn />
          <HeaderTable />
          {files}
        </div>
      </div>
    </CurrentDirContext>
  );
};
