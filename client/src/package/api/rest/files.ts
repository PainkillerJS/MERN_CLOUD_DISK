import makeRequest from "../makeRequest";
import { EMethodRequest } from "../../types";

export const getFiles = async (query: string, headers: RequestInit["headers"]) =>
  await makeRequest(`http://localhost:5000/files${query}`, { method: EMethodRequest.GET, headers });
