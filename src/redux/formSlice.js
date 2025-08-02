import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "forms",
  initialState: {
    list: [],
  },
  reducers: {
    setForms: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setForms } = formSlice.actions;
export default formSlice.reducer;
