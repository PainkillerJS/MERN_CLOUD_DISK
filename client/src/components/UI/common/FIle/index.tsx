import "./style.scss";

import { useAppDispatch } from "../../../../store/hooks/reduxHooks";

import { useCurrentDir } from "../../../context/CurrentDirContext";
import { getFilesThunk } from "../../../../features/Files/action";
import { ImgDir } from "../../../../assets/ImgDir";
import { ImgFile } from "../../../../assets/ImgFile";

import type { IFiles } from "../../../../common/model/IFiles";

export const File = ({ name, size, type, date, _id }: Pick<IFiles, "_id" | "name" | "size" | "type" | "date">) => {
  const dispatch = useAppDispatch();
  const { setCurrentDir, path } = useCurrentDir();

  const icon = type === "dir" ? <ImgDir /> : <ImgFile />;

  const openDir = () => {
    if (type === "dir") {
      setCurrentDir({ currentDir: _id, path: [...path, _id] });
      dispatch(getFilesThunk(_id));
    }
  };

  return (
    <div className="file" onClick={openDir}>
      <div className="file__name">
        {icon}
        {name}
      </div>
      <div className="file__date">{date?.slice(0, 10)}</div>
      <div className="file__size">{size}gb</div>
    </div>
  );
};
