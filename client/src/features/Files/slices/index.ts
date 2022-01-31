import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getFilesThunk } from "../action";
import type { IFilesDTO } from "../../../common/model/IFiles";
import type { IRequest } from "../../../common/model/IRequest";

interface IInitialState extends IRequest {
  files: IFilesDTO["files"];
}

const initialState: IInitialState = {
  files: [],
  error: "",
  isLoading: false
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(getFilesThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFilesThunk.fulfilled, (state, { payload }: PayloadAction<IFilesDTO>) => {
      state.files = payload.files;
      state.isLoading = true;
    });
  }
});
