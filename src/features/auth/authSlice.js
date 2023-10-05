import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAuthData } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
