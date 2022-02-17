import "./styles.scss";

import { useDrapDrop } from "../../hooks/useDrag";
import { SideBar } from "../SideBar";
import { Files } from "./components/Files";

export const FilesList = () => {
  const { dragEnter, handleDragEnter, handleDragLeave, handleDrop } = useDrapDrop();

  return (
    <>
      {!dragEnter ? (
        <div className="files" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragEnter}>
          <SideBar />
          <Files />
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
