import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getFilesThunk, createDirThunk, searchFilesThunk, uploadFileThunk } from "../action";
import type { IFilesDTO } from "../../../common/model/IFiles";
import type { IRequest } from "../../../common/model/IRequest";

interface IInitialState extends IRequest {
  files: IFilesDTO["files"];
  isSearch: boolean;
  isUpload: boolean;
  result: boolean;
}

const initialState: IInitialState = {
  files: [],
  error: "",
  isLoading: false,
  isSearch: false,
  isUpload: false,
  result: false
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(getFilesThunk.pending, (state: IInitialState) => {
      state.isLoading = true;
      state.isSearch = false;
    });
    builder.addCase(getFilesThunk.fulfilled, (state, { payload }: PayloadAction<IFilesDTO>) => {
      state.files = payload.files;
      state.isLoading = false;
    });
    builder.addCase(createDirThunk.pending, (state: IInitialState) => {
      state.isLoading = true;
    });
    builder.addCase(createDirThunk.fulfilled, (state, { payload }: PayloadAction<boolean>) => {
      state.result = payload;
      state.isLoading = false;
    });
    builder.addCase(uploadFileThunk.pending, (state: IInitialState) => {
      state.isUpload = true;
    });
    builder.addCase(uploadFileThunk.fulfilled, (state) => {
      state.isUpload = false;
    });
    builder.addCase(searchFilesThunk.pending, (state: IInitialState) => {
      state.isLoading = true;
      state.isSearch = true;
    });
    builder.addCase(searchFilesThunk.fulfilled, (state, { payload }: PayloadAction<IFilesDTO>) => {
      state.files = payload.files;
      state.isLoading = false;
    });
  }
});
