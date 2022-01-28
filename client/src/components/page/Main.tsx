import { useEffect } from "react";

import { useAppDispatch } from "../../store/hooks/reduxHooks";
import { getItem } from "../../package/storage";
import { AuthToken } from "../../features/Auth/action";
import { Header } from "../../components/UI/Header";

export const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getItem() !== "undefined" && getItem();

    token && dispatch(AuthToken(token));
  }, []);

  return (
    <>
      <Header />
    </>
  );
};
