import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const selectLoading = (state) => state.loading;

export default loadingSlice.reducer;
