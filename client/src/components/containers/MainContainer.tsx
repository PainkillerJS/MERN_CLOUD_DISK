import "./normalize.scss";

import { ModalProvider } from "../context/ModalContext";
import { Header } from "../UI/Header";
import { Modal } from "../UI/Modal";

export const MainContainer = () => {
  return (
    <ModalProvider>
      <div>
        <Header />
        <Modal />
      </div>
    </ModalProvider>
  );
};
