import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("persist")) || false;

const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    setPersist: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPersist } = persistSlice.actions;

export const selectPersist = (state) => state.persist;

export default persistSlice.reducer;
