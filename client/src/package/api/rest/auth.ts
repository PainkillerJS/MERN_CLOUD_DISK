import makeRequest from "../makeRequest";
import { EMethodRequest, ETypeLogin } from "../../types";

export const registration = async (body: BodyInit) =>
  await makeRequest("http://localhost:5000/api/auth/registration", { body, method: EMethodRequest.POST });

export const login = async (body: BodyInit) =>
  await makeRequest(`http://localhost:5000/api/auth/${ETypeLogin.LOGIN}`, { body, method: EMethodRequest.POST });

export const authToken = async (headers: RequestInit["headers"]) =>
  await makeRequest(`http://localhost:5000/api/${ETypeLogin.AUTH_TOKEN}`, { headers, method: EMethodRequest.POST });
