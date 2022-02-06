import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { EFormType } from "../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks/reduxHooks";
import { getFilesThunk } from "../../features/Files/action";
import { Files } from "../UI/FIlesList";
import { Header } from "../../components/UI/Header";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFilesThunk());
  }, []);

  useEffect(() => {
    !isAuth && navigate(`/auth/${EFormType.FORM_LOGIN}`);
  }, [isAuth]);

  return (
    <>
      <Header />
      <Files />
    </>
  );
};
