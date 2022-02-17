import { useState } from "react";

import { useAppDispatch } from "../../../../store/hooks/reduxHooks";
import { createDirThunk, getFilesThunk } from "../../../../features/Files/action";
import { useCurrentDir } from "../../../context/CurrentDirContext";
import { Modal } from "../../Modal";
import { Input } from "../../common/Input";
import { Button } from "../../common/Btn";
import type { IModalProps } from "../../Modal";

export const CreateFileModal = ({ callbackCloseModal }: Required<Pick<IModalProps, "callbackCloseModal">>) => {
  const dispatch = useAppDispatch();
  const { currentDir } = useCurrentDir();
  const [nameDir, setNameDir] = useState<string>("");

  const createDir = async () => {
    const { payload: response } = await dispatch(createDirThunk({ name: nameDir, type: "dir", parent: currentDir || undefined }));

    if (response) {
      currentDir ? dispatch(getFilesThunk(currentDir)) : dispatch(getFilesThunk());
      callbackCloseModal();
    }
  };

  return (
    <Modal callbackCloseModal={callbackCloseModal}>
      <span className="modal__title">Создать папку</span>
      <Input value={nameDir} setValue={setNameDir} placeholder="Имя папки" />
      <Button text="Создать" className="modal__btn" onClick={createDir} />
      <span className="modal__warning">Папка будет создана в текущей директории</span>
    </Modal>
  );
};
