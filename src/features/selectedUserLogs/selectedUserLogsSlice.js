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
      const dayIndex = state.findIndex((log) => log.day === day && log.logs);
      const logIndex = state[dayIndex].logs.findIndex((log) => {
        return log._id === updatedLog._id;
      });
      state[dayIndex].logs[logIndex] = updatedLog;
    },
    deleteLog: (state, action) => {
      const deletedLog = action.payload;
      const day = new Date(deletedLog.date).getDate();
      const dayIndex = state.findIndex((log) => log.day === day && log.logs);
      const logIndex = state[dayIndex].logs.findIndex((log) => {
        return log._id === deletedLog._id;
      });
      state[dayIndex].logs.splice(logIndex, 1);
    },
  },
});

export const { setSelectedUserLogs, updateLogs, deleteLog } =
  selectedUserLogsSlice.actions;

export const selectSelectedUserLogs = (state) => state.selectedUserLogs;

export default selectedUserLogsSlice.reducer;
