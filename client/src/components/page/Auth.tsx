import { useEffect } from "react";

import { useAppDispatch } from "../../store/hooks/reduxHooks";
import { getItem } from "../../package/storage";
import { AuthToken } from "../../features/Auth/action";
import { Modal } from "../UI/Modal";
import { Forms } from "../UI/Forms";

export const AuthPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getItem() !== "undefined" && getItem();

    if (token) {
      token && dispatch(AuthToken());
    }
  }, []);

  return (
    <Modal>
      <Forms />
    </Modal>
  );
};
