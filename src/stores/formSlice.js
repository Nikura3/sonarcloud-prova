import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: { isForm: true },
  reducers: {
    deactive(state) {
      state.isForm = false;
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice;
