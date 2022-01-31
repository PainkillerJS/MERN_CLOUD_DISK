import { configureStore } from "@reduxjs/toolkit";

import { usersSlice } from "../features/Auth/slice/userSlice";
import { filesSlice } from "../features/Files/slices";

export const store = configureStore({
  reducer: {
    user: usersSlice.reducer,
    files: filesSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
