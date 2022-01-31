import "./styles.scss";

import { useAppSelector } from "../../../store/hooks/reduxHooks";
import { File } from "../common/FIle";
import { SideBar } from "../SideBar";

export const Files = () => {
  const files = useAppSelector((state) => state.files.files).map(({ name, size, type, date }) => (
    <File key={name} name={name} size={size} type={type} date={date} />
  ));

  return (
    <div className="files">
      <SideBar />
      <div className="files__list">
        <div className="files__header">
          <div className="files__name">Название</div>
          <div className="files__date">Дата создания</div>
          <div className="files__size">Размер</div>
        </div>
        {files}
      </div>
    </div>
  );
};
