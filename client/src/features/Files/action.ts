import { createAsyncThunk } from "@reduxjs/toolkit";

import { getFiles } from "../../package/api/rest/files";
import { getItem } from "../../package/storage/adapter/token";
import type { IFilesDTO, IFilesRequest } from "../../common/model/IFiles";

export const getFilesThunk = createAsyncThunk<IFilesDTO, IFilesRequest["parent"]>("files/get", async (parent) => {
  try {
    const response = await getFiles(parent ? `?parent=${parent}` : "", { authorization: `BEARER ${getItem()}` });
    return response;
  } catch (e) {
    console.log(e);
  }
});
