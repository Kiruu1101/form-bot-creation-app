import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
