import "./styles.scss";

import { useParams } from "react-router-dom";

import { FooterForm } from "./components/FooterForm";
import { Form } from "./components/Form";
import { EFormType } from "../../types";

export const FormsModal = () => {
  const { action } = useParams();

  return (
    <>
      <h3>{action === EFormType.FORM_REG ? "Регистрация" : "Авторизация"}</h3>
      <form>
        <Form action={action} />
      </form>
      <FooterForm />
    </>
  );
};
