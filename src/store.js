import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import formReducer from "./redux/formSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forms: formReducer, 
  },
});
