import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const selectedUserLogsSlice = createSlice({
  name: "selectedUserLogs",
  initialState,
  reducers: {
    setSelectedUserLogs: (state, action) => {
      return action.payload;
    },
    updateLogs: (state, action) => {
      const updatedLog = action.payload;
      const day = new Date(updatedLog.date).getDate();
      const dayIndex = state.findIndex((log) => log.day === day);
      const logIndex = state[dayIndex].logs.findIndex(
        (log) => log.id === updatedLog.id
      );
      state[dayIndex].logs[logIndex] = updatedLog;
    },
  },
});

export const { setSelectedUserLogs, updateLogs } =
  selectedUserLogsSlice.actions;

export const selectSelectedUserLogs = (state) => state.selectedUserLogs;

export default selectedUserLogsSlice.reducer;
