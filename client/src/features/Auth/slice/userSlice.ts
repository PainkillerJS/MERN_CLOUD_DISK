import { createSlice } from "@reduxjs/toolkit";
import type { SerializedError } from "@reduxjs/toolkit";

import { AuthRegistration } from "../action";
import type { TUser } from "../../../common/model/IUser";

const initialState: TUser & { error: SerializedError } = {
  email: "",
  password: "",
  error: {}
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AuthRegistration.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
    builder.addCase(AuthRegistration.rejected, (state, { error }) => {
      state.error = error;
    });
  }
});
