import { configureStore } from "@reduxjs/toolkit";
import { registerSlice } from "./components/auth/registerSlice";
import { authSlice } from "./components/auth/authSlice";
import { onlineSlice } from "./features/onlineSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    auth: authSlice.reducer,
    online: onlineSlice.reducer,
  },
});
