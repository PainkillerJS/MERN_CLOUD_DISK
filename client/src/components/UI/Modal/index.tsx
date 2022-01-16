import "./styles.scss";

import { Link } from "react-router-dom";
import { Forms } from "../Forms";

export const Modal = () => {
  return (
    <div className="modal">
      <div className="modal__window">
        <Link className="modal__close" to="/">
          &times;
        </Link>
        <Forms />
      </div>
    </div>
  );
};
