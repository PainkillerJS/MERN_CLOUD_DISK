import "./styles.scss";

import { useModal } from "../../context/ModalContext";

export const Modal = () => {
  const { modalType } = useModal();
  console.log(modalType);
  return (
    <div className="modal">
      <div className="modal__window">53454</div>
    </div>
  );
};
