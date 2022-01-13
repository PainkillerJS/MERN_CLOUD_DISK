import { createContext, useContext } from "react";
import type { FC } from "react";

import { EModalType } from "../types";

type TProps = {
  modalType: EModalType;
};

const ModalContext = createContext<TProps>({
  modalType: EModalType.NO_MODAL
});

export const ModalProvider: FC = ({ children }) => {
  return <ModalContext.Provider value={{ modalType: EModalType.NO_MODAL }}>{children}</ModalContext.Provider>;
};

export const useModal = () => useContext(ModalContext);
