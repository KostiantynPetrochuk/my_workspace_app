import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    updateUserLog: (state, action) => {
      const { userId, data } = action.payload;
      const userToUpdate = state.find((user) => user._id === userId);
      if (data.status === "in") {
        userToUpdate.timelogsHistory.push(data);
      }

      if (data.status === "out") {
        const currentLogIndex = userToUpdate.timelogsHistory.findIndex(
          (log) => log._id === data._id
        );
        userToUpdate.timelogsHistory[currentLogIndex] = data;
      }

      if (userToUpdate) {
        userToUpdate["lastTimeLog"] = data;
      }
    },
  },
});

export const { setUsers, updateUserLog } = usersSlice.actions;

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
