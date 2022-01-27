import { createAsyncThunk } from "@reduxjs/toolkit";

import { registration, login } from "../../package/api/rest/auth";
import { ETypeLogin } from "../../package/types";
import type { TUserRequest, IUserDTO } from "../../common/model/IUser";

export const AuthRegistration = createAsyncThunk<IUserDTO, TUserRequest>("user/registration", async (body) => {
  try {
    const response = await registration(JSON.stringify(body));
    return response;
  } catch (e) {
    return e as string;
  }
});

export const AuthLogin = createAsyncThunk<IUserDTO, TUserRequest>("user/login", async (body) => {
  try {
    const response = await login(JSON.stringify(body), ETypeLogin.LOGIN);
    return response;
  } catch (e) {
    return e as string;
  }
});

export const AuthToken = createAsyncThunk<IUserDTO, string>("user/token", async (body) => {
  try {
    const response = await login(JSON.stringify(`BEARER ${body}`), ETypeLogin.AUTH_TOKEN);
    return response;
  } catch (e) {
    return e as string;
  }
});
