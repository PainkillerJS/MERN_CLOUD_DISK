import "./style.scss";

import type { ChangeEventHandler } from "react";

import { useAppDispatch } from "../../../store/hooks/reduxHooks";
import { useCurrentDir } from "../../context/CurrentDirContext";
import { uploadFileThunk, getFilesThunk } from "../../../features/Files/action";

export const UploadFile = () => {
  const dispatch = useAppDispatch();
  const { currentDir } = useCurrentDir();

  const hanfleUploadFile: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    //@ts-expect-error
    const files = [...target.files];
    files.forEach(async (file, index) => {
      await dispatch(uploadFileThunk({ file, parent: currentDir }));
      if (index === files.length - 1) dispatch(getFilesThunk());
    });
  };

  return (
    <div className="uploadFile">
      <label htmlFor="file" className="uploadFile__label">
        Загрузить файл
      </label>
      <input type="file" id="file" className="uploadFile__input" onChange={hanfleUploadFile} multiple />
    </div>
  );
};
