import { createAsyncThunk } from "@reduxjs/toolkit";

import { getFiles, createDir, uploadFile } from "../../package/api/rest/files";
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
