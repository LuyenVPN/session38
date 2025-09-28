import { configureStore } from "@reduxjs/toolkit";
import books from "./slices/bookSlice";

export const store = configureStore({
  reducer: {
    books
  },
});