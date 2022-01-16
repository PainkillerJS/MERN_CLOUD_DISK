import { createAsyncThunk } from "@reduxjs/toolkit";

import { registration, login } from "../../package/api/rest/auth";
import type { TUser } from "../../common/model/IUser";

export const AuthRegistration = createAsyncThunk<string, TUser>("user/registration", async (body) => {
  try {
    const response = await registration(JSON.stringify(body));
    return response;
  } catch (e) {
    return e as string;
  }
});

export const AuthLogin = createAsyncThunk<string, TUser>("user/login", async (body) => {
  try {
    const response = await login(JSON.stringify(body));
    return response;
  } catch (e) {
    return e as string;
  }
});
