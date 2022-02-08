import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { EFormType } from "../../../types";

export const FooterForm = memo(() => {
  const navigate = useNavigate();
  const { action } = useParams();

  const changeForms = (type: EFormType) => () => {
    navigate(`/auth/${type}`);
  };

  return (
    <div className="form__footer">
      {action === EFormType.FORM_REG ? (
        <>
          Уже имеете аккаунт?
          <span onClick={changeForms(EFormType.FORM_LOGIN)}>Войти</span>
        </>
      ) : (
        <>
          Нет аккаунта?
          <span onClick={changeForms(EFormType.FORM_REG)}>Регистрация</span>
        </>
      )}
    </div>
  );
});
