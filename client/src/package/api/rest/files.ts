import { URL_REQUEST } from "../../../config/requestUrl";
import makeRequest from "../makeRequest";
import { EMethodRequest } from "../../types";

export const getFiles = async (query: string, headers: RequestInit["headers"]) =>
  await makeRequest(`${URL_REQUEST}/api/files${query}`, { method: EMethodRequest.GET, headers });

export const createDir = async (body: RequestInit["body"], headers: RequestInit["headers"]) =>
  await makeRequest(`${URL_REQUEST}/api/files/createFile`, { method: EMethodRequest.POST, body, headers });

export const uploadFile = async (body: RequestInit["body"], headers: RequestInit["headers"]) =>
  await makeRequest(`${URL_REQUEST}/api/files/upload`, { method: EMethodRequest.POST, body, headers }, true);

export const downloadFile = async (query: string, headers: RequestInit["headers"]) =>
  makeRequest(`${URL_REQUEST}/api/files/download${query}`, { method: EMethodRequest.GET, headers }, true);

export const deleteFile = async (query: string, headers: RequestInit["headers"]) =>
  makeRequest(`${URL_REQUEST}/api/files/delete${query}`, { method: EMethodRequest.DELETE, headers });

export const searchFiles = async (query: string, headers: RequestInit["headers"]) =>
  makeRequest(`${URL_REQUEST}/api/files/search?${query}`, { method: EMethodRequest.GET, headers });
