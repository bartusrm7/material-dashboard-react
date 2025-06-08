import { configureStore } from "@reduxjs/toolkit";
import { registerSlice } from "./components/auth/registerSlice";
import { authSlice } from "./components/auth/authSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    auth: authSlice.reducer,
  },
});
