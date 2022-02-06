import makeRequest from "../makeRequest";
import { EMethodRequest } from "../../types";

export const getFiles = async (query: string, headers: RequestInit["headers"]) =>
  await makeRequest(`http://localhost:5000/files${query}`, { method: EMethodRequest.GET, headers });

export const createDir = async (body: RequestInit["body"], headers: RequestInit["headers"]) =>
  await makeRequest("http://localhost:5000/files/createFile", { method: EMethodRequest.POST, body, headers });
