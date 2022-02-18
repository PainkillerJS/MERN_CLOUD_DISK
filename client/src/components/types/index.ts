import { useAppDispatch } from "../../store/hooks/reduxHooks";

export enum EFormType {
  FORM_REG = "registration",
  FORM_LOGIN = "authentication"
}

export interface IDispatchProps {
  dispatch: ReturnType<typeof useAppDispatch>;
}
