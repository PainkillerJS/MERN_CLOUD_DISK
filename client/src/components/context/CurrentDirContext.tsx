import { createContext, useState, useContext } from "react";
import type { FC, Dispatch } from "react";

type IContext = {
  currentDir: string;
  path: Array<string>;
  setCurrentDir: Dispatch<React.SetStateAction<Pick<IContext, "currentDir" | "path">>>;
};

const currentDirContext = createContext<IContext>({
  currentDir: "",
  path: [],
  setCurrentDir: () => {}
});

export const CurrentDirContext: FC = ({ children }) => {
  const [{ currentDir, path }, setCurrentDir] = useState<Pick<IContext, "currentDir" | "path">>({ currentDir: "", path: [] });

  return <currentDirContext.Provider value={{ currentDir, path, setCurrentDir }}>{children}</currentDirContext.Provider>;
};

export const useCurrentDir = () => useContext(currentDirContext);
