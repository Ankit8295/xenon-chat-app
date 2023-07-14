import initialState from "./initialState";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const defaultSlice = createSlice({
  name: "default",
  initialState,
  reducers: {
    defaultFn: (state, action: PayloadAction<unknown>) => {},
  },
});

export const { defaultFn } = defaultSlice.actions;
export default defaultSlice.reducer;
