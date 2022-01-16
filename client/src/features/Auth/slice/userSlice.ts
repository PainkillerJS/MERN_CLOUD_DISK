import { createSlice } from "@reduxjs/toolkit";

import { setItem } from "../../../package/storage";
import type { IRequest } from "../../../common/model/IRequest";
import { AuthRegistration, AuthLogin } from "../action";

interface IUserDTO extends IRequest {
  message: string;
}

const initialState: IUserDTO = {
  error: {},
  message: "",
  loading: false
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(AuthRegistration.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AuthRegistration.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.loading = false;
    });
    builder.addCase(AuthRegistration.rejected, (state, { error }) => {
      state.error = error;
      state.loading = false;
    });

    builder.addCase(AuthLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AuthLogin.fulfilled, (state, action) => {
      //@ts-expect-error
      setItem(action.payload.jwt);
      state.loading = false;
    });
    builder.addCase(AuthLogin.rejected, (state, { error }) => {
      state.error = error;
      state.loading = false;
    });
  }
});
