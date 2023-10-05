import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import persistReducer from "../features/persist/persistSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    persist: persistReducer,
  },
});

export default store;
