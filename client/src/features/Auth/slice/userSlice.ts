import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";

import { AuthRegistration, AuthLogin, AuthToken } from "../action";
import { setItem, removeItem } from "../../../package/storage";
import type { IUserDTO } from "../../../common/model/IUser";

interface IInitialState extends IUserDTO {
  jwt?: string;
}

const initialState: IInitialState = {
  error: {},
  user: {},
  isAuth: false,
  loading: false
};

const pending = (state: IUserDTO) => {
  state.loading = true;
};

const fulfilled = (state: IUserDTO, { payload: { jwt, user } }: PayloadAction<IInitialState>) => {
  state.isAuth = true;
  state.user = user;
  jwt && setItem(jwt);
  state.loading = false;
};

const rejected = (state: IUserDTO, { error }: PayloadAction<unknown, string, never, SerializedError>) => {
  state.error = error;
  state.loading = false;
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      state.user = {};
      state.isAuth = false;
      removeItem();
    }
  },
  extraReducers: async (builder) => {
    builder.addCase(AuthRegistration.pending, pending);
    builder.addCase(AuthRegistration.fulfilled, fulfilled);
    builder.addCase(AuthRegistration.rejected, rejected);

    builder.addCase(AuthLogin.pending, pending);
    builder.addCase(AuthLogin.fulfilled, fulfilled);
    builder.addCase(AuthLogin.rejected, rejected);

    builder.addCase(AuthToken.pending, pending);
    builder.addCase(AuthToken.fulfilled, fulfilled);
    builder.addCase(AuthToken.rejected, rejected);
  }
});

export const { logOut } = usersSlice.actions;
