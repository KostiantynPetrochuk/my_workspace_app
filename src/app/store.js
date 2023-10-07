import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import persistReducer from "../features/persist/persistSlice";
import loadingReducer from "../features/loading/loadingSlice";
import messageReducer from "../features/message/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    persist: persistReducer,
    loading: loadingReducer,
    message: messageReducer,
  },
});

export default store;
