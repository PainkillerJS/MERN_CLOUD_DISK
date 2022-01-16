import { createAsyncThunk } from "@reduxjs/toolkit";

import { registration } from "../../package/api/rest/auth";
import type { TUser } from "../../common/model/IUser";

export const AuthRegistration = createAsyncThunk<string, TUser>("user/registration", async (body) => {
  try {
    const response = await registration(JSON.stringify(body)).toString();
    return response;
  } catch (e) {
    return e as string;
  }
});
