import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthRegistration, AuthLogin, AuthToken } from "../action";
import { setItem, removeItem } from "../../../package/storage";
import type { IUserDTO } from "../../../common/model/IUser";

interface IInitialState extends IUserDTO {
  jwt?: string;
  message?: string;
}

const initialState: IInitialState = {
  error: "",
  user: {},
  isAuth: false,
  isLoading: false
};

const pending = (state: IUserDTO) => {
  state.isLoading = true;
};

const fulfilled = (state: IUserDTO, { payload: { jwt, user, message = "" } }: PayloadAction<IInitialState>) => {
  if (user) {
    state.isAuth = true;
    state.user = user;
    jwt && setItem(jwt);
  } else {
    state.error = message;
  }

  state.isLoading = false;
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

    builder.addCase(AuthLogin.pending, pending);
    builder.addCase(AuthLogin.fulfilled, fulfilled);

    builder.addCase(AuthToken.pending, pending);
    builder.addCase(AuthToken.fulfilled, fulfilled);
  }
});

export const { logOut } = usersSlice.actions;
