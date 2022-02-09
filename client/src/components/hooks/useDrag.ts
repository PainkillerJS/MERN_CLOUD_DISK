import { useState } from "react";
import type { DragEventHandler } from "react";

import { useAppDispatch } from "../../store/hooks/reduxHooks";
import { useCurrentDir } from "../context/CurrentDirContext";
import { uploadFileThunk, getFilesThunk } from "../../features/Files/action";

export const useDrapDrop = () => {
  const dispatch = useAppDispatch();
  const { currentDir } = useCurrentDir();
  const [dragEnter, setDragEnter] = useState(false);

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //@ts-expect-error
    const files = [...e.dataTransfer.files];

    files.forEach(async (file, index) => {
      await dispatch(uploadFileThunk({ file, parent: currentDir }));
      if (index === files.length - 1) dispatch(getFilesThunk());
    });

    setDragEnter(false);
  };

  return { handleDrop, handleDragEnter, handleDragLeave, dragEnter };
};
