import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "lab/project-list.slice";

export const rootReducer = {
  modalState: projectListSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
