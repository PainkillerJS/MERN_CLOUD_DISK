import { useState } from "react";

import { Input } from "../../common/Input";
import { ImgSearch } from "../../../../assets/ImgSearch";
import { useCurrentDir } from "../../../context/CurrentDirContext";
import { searchFilesThunk, getFilesThunk } from "../../../../features/Files/action";
import type { IDispatchProps } from "../../../types";

export const HeaderSearch = ({ dispatch }: IDispatchProps) => {
  const [valueSearch, setValueSearch] = useState("");
  const { currentDir } = useCurrentDir();

  const onSearchFiles = (name: string) => {
    name ? dispatch(searchFilesThunk(name)) : dispatch(getFilesThunk(currentDir));
  };

  return (
    <div className="search">
      <ImgSearch />
      <Input value={valueSearch} onChangeCustom={onSearchFiles} setValue={setValueSearch} placeholder="Поиск..." />
    </div>
  );
};
