import "./style.scss";

import { useMemo } from "react";

import { useAppDispatch } from "../../../../store/hooks/reduxHooks";
import { useCurrentDir } from "../../../context/CurrentDirContext";
import { getFilesThunk, downloadFileThunk, deleteFileThunk } from "../../../../features/Files/action";
import { converSize } from "../../../../helpers/utills";
import { ImgDir } from "../../../../assets/ImgDir";
import { ImgFile } from "../../../../assets/ImgFile";
import type { IFiles } from "../../../../common/model/IFiles";

export const File = ({ name, size, type, date, _id }: Pick<IFiles, "_id" | "name" | "size" | "type" | "date">) => {
  const dispatch = useAppDispatch();
  const { setCurrentDir, path, currentDir } = useCurrentDir();

  const icon = useMemo(() => (type === "dir" ? <ImgDir /> : <ImgFile />), []);

  const openDir = () => {
    if (type === "dir") {
      setCurrentDir({ currentDir: _id, path: [...path, _id] });
      dispatch(getFilesThunk(_id));
    }
  };

  const downloadFile = () => dispatch(downloadFileThunk({ id: _id, name }));

  const deleteFile = async () =>
    confirm(`Удалить ${name}?`) &&
    (await dispatch(deleteFileThunk({ id: _id, parent: currentDir }))) &&
    dispatch(getFilesThunk(currentDir));

  return (
    <div className="file" onClick={openDir}>
      <div className="file__name">
        {icon}
        <span>{name}</span>
      </div>

      {type !== "dir" && (
        <div className="file__download" onClick={downloadFile}>
          Скачать файл
        </div>
      )}

      <div className="file__remove" onClick={deleteFile}>
        Удалить
      </div>
      <div className="file__date">{date?.slice(0, 10)}</div>
      <div className="file__size">{converSize(size)}</div>
    </div>
  );
};
