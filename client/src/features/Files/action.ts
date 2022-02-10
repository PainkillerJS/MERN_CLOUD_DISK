import { createAsyncThunk } from "@reduxjs/toolkit";

import { getFiles, createDir, uploadFile, downloadFile } from "../../package/api/rest/files";
import { getItem } from "../../package/storage/adapter/token";
import type { IFilesDTO, IFilesRequest, IFiles } from "../../common/model/IFiles";

export const getFilesThunk = createAsyncThunk<IFilesDTO, IFilesRequest["parent"]>("files/get", async (parent) => {
  try {
    const response = await getFiles(parent ? `?parent=${parent}` : "", { authorization: `BEARER ${getItem()}` });
    return response;
  } catch (e) {
    console.log(e);
  }
});

export const createDirThunk = createAsyncThunk<boolean, Pick<IFiles, "name" | "type"> & Partial<Pick<IFiles, "parent">>>(
  "files/createDir",
  async (body) => {
    try {
      const response = await createDir(JSON.stringify(body), { authorization: `BEARER ${getItem()}` });
      return response;
    } catch (e) {
      console.log(e);
    }
  }
);

export const uploadFileThunk = createAsyncThunk<void, { file: string } & Partial<Pick<IFiles, "parent">>>(
  "files/uploadFile",
  async ({ file, parent }) => {
    try {
      const formData = new FormData();

      formData.append("file", file);

      if (parent) formData.append("parent", parent);

      const response = await uploadFile(formData, { authorization: `BEARER ${getItem()}` });
      return response;
    } catch (e) {
      console.log(e);
    }
  }
);

export const downloadFileThunk = createAsyncThunk<void, { id: string; name: string }>("files/download", async ({ id, name }) => {
  try {
    const urlForDownload = await downloadFile(`?id=${id}`, { authorization: `BEARER ${getItem()}` })
      .then((response) => response.blob())
      .then((response) => window.URL.createObjectURL(response));

    const aDownload = document.createElement("a");
    aDownload.href = urlForDownload;
    aDownload.download = name;

    document.body.appendChild(aDownload);
    aDownload.click();
    aDownload.remove();
  } catch (e) {
    console.log(e);
  }
});
