import "./style.scss";

import { useCurrentDir } from "../../context/CurrentDirContext";
import { useAppDispatch } from "../../../store/hooks/reduxHooks";
import { getFilesThunk } from "../../../features/Files/action";
import { Button } from "../common/Btn";

export const BackBtn = () => {
  const dispatch = useAppDispatch();
  const { path, setCurrentDir } = useCurrentDir();

  const backDir = () => {
    const newPath = path.slice(0, -1);
    const newCurrentDir = newPath[newPath.length - 1];

    setCurrentDir({ currentDir: newCurrentDir, path: newPath });
    dispatch(getFilesThunk(newCurrentDir));
  };

  return (
    <>
      {!!path.length && (
        <div className="backBtn__wrapper">
          <Button onClick={backDir} className="backBtn" text="Назад" />
        </div>
      )}
    </>
  );
};
