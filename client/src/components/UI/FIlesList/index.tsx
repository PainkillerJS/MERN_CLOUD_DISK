import "./styles.scss";

import { useAppSelector } from "../../../store/hooks/reduxHooks";
import { HeaderTable } from "./components/HeaderTable";
import { useDrapDrop } from "../../hooks/useDrag";
import { BackBtn } from "../BackBtn";
import { File } from "../common/FIle";
import { UploadFile } from "../UploaderFile";
import { SideBar } from "../SideBar";

export const Files = () => {
  const files = useAppSelector((state) => state.files.files)?.map(({ name, size, type, date, _id }) => (
    <File key={name} name={name} size={size} type={type} date={date} _id={_id} />
  ));
  const { dragEnter, handleDragEnter, handleDragLeave, handleDrop } = useDrapDrop();

  return (
    <>
      {!dragEnter ? (
        <div className="files" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragEnter}>
          <SideBar />
          <div className="files__list">
            <div className="files__controller">
              <BackBtn />
              <UploadFile />
            </div>
            <HeaderTable />
            {files}
          </div>
        </div>
      ) : (
        <div
          className="dragAndDrop"
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragEnter}
        >
          Перетащи файлы
        </div>
      )}
    </>
  );
};
