import { createSlice } from "@reduxjs/toolkit";
import { NORMAL_STATUS } from "../../constants";

const initialState = {
  status: NORMAL_STATUS,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = globalSlice.actions;

export default globalSlice.reducer;
