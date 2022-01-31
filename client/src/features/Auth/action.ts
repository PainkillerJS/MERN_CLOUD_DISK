import { createAsyncThunk } from "@reduxjs/toolkit";

import { registration, login, authToken } from "../../package/api/rest/auth";
import { getItem } from "../../package/storage/adapter/token";
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
    const response = await login(JSON.stringify(body));
    return response;
  } catch (e) {
    return e as string;
  }
});

export const AuthToken = createAsyncThunk<IUserDTO, void>("user/token", async () => {
  try {
    const response = await authToken({ authorization: `BEARER ${getItem()}` });
    return response;
  } catch (e) {
    return e as string;
  }
});
