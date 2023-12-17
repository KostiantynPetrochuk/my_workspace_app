import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const selectedUserLogsSlice = createSlice({
  name: "selectedUserLogs",
  initialState,
  reducers: {
    setSelectedUserLogs: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedUserLogs } = selectedUserLogsSlice.actions;

export const selectSelectedUserLogs = (state) => state.selectedUserLogs;

export default selectedUserLogsSlice.reducer;
