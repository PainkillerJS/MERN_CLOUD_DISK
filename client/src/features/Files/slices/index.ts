import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getFilesThunk, createDirThunk } from "../action";
import type { IFilesDTO } from "../../../common/model/IFiles";
import type { IRequest } from "../../../common/model/IRequest";

interface IInitialState extends IRequest {
  files: IFilesDTO["files"];
  result: boolean;
}

const initialState: IInitialState = {
  files: [],
  error: "",
  isLoading: false,
  result: false
};

const pending = (state: IInitialState) => {
  state.isLoading = true;
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(getFilesThunk.pending, pending);
    builder.addCase(getFilesThunk.fulfilled, (state, { payload }: PayloadAction<IFilesDTO>) => {
      state.files = payload.files;
      state.isLoading = false;
    });
    builder.addCase(createDirThunk.pending, pending);
    builder.addCase(createDirThunk.fulfilled, (state, { payload }: PayloadAction<boolean>) => {
      state.result = payload;
      state.isLoading = false;
    });
  }
});
