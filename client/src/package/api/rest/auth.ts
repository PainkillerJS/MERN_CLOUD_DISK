import makeRequest from "../makeRequest";
import { EMethodRequest } from "../../types";

export const registration = async (body: BodyInit) =>
  await makeRequest("http://localhost:5000/auth/registration", { body, method: EMethodRequest.POST });

export const login = async (body: BodyInit) => await makeRequest("http://localhost:5000/auth/login", { body, method: EMethodRequest.POST });
