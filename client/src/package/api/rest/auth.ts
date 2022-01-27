import makeRequest from "../makeRequest";
import { EMethodRequest, ETypeLogin } from "../../types";

export const registration = async (body: BodyInit) =>
  await makeRequest("http://localhost:5000/auth/registration", { body, method: EMethodRequest.POST });

export const login = async (body: BodyInit, type: ETypeLogin) =>
  await makeRequest(`http://localhost:5000/auth/${type}`, { body, method: EMethodRequest.POST });
