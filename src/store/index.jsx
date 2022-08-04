import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "lab/project-list.slice";
import { authSlice } from "./auth.slice";

export const rootReducer = {
  modalState: projectListSlice.reducer,
  authState: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
