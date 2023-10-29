import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import persistReducer from "../features/persist/persistSlice";
import loadingReducer from "../features/loading/loadingSlice";
import messageReducer from "../features/message/messageSlice";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    persist: persistReducer,
    loading: loadingReducer,
    message: messageReducer,
    users: usersReducer,
  },
});

export default store;
