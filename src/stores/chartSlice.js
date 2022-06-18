import { createSlice } from "@reduxjs/toolkit";

const chartSlice = createSlice({
  name: "chart",
  initialState: { isChart: false },
  reducers: {
    active(state) {
      state.isChart = true;
    },
  },
});

export const chartActions = chartSlice.actions;

export default chartSlice;
