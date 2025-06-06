import { configureStore } from "@reduxjs/toolkit";
import { registerSlice } from "./components/auth/registerSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
  },
});
