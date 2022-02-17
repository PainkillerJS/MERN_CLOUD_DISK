import makeRequest from "../makeRequest";
import { EMethodRequest } from "../../types";

export const getFiles = async (query: string, headers: RequestInit["headers"]) =>
  await makeRequest(`http://localhost:5000/api/files${query}`, { method: EMethodRequest.GET, headers });

export const createDir = async (body: RequestInit["body"], headers: RequestInit["headers"]) =>
  await makeRequest("http://localhost:5000/api/files/createFile", { method: EMethodRequest.POST, body, headers });

export const uploadFile = async (body: RequestInit["body"], headers: RequestInit["headers"]) =>
  await makeRequest("http://localhost:5000/api/files/upload", { method: EMethodRequest.POST, body, headers }, true);

export const downloadFile = async (query: string, headers: RequestInit["headers"]) =>
  makeRequest(`http://localhost:5000/api/files/download${query}`, { method: EMethodRequest.GET, headers }, true);

export const deleteFile = async (query: string, headers: RequestInit["headers"]) =>
  makeRequest(`http://localhost:5000/api/files/delete${query}`, { method: EMethodRequest.DELETE, headers });
