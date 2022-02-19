import { URL_REQUEST } from "../../../config/requestUrl";
import makeRequest from "../makeRequest";
import { EMethodRequest, ETypeLogin } from "../../types";

export const registration = async (body: BodyInit) =>
  await makeRequest(`${URL_REQUEST}/api/auth/registration`, { body, method: EMethodRequest.POST });

export const login = async (body: BodyInit) =>
  await makeRequest(`${URL_REQUEST}/api/auth/${ETypeLogin.LOGIN}`, { body, method: EMethodRequest.POST });

export const authToken = async (headers: RequestInit["headers"]) =>
  await makeRequest(`${URL_REQUEST}/api/${ETypeLogin.AUTH_TOKEN}`, { headers, method: EMethodRequest.POST });
