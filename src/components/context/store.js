import { configureStore } from "@reduxjs/toolkit";
import hotelsSlice from "./hotelsSlice";

export const store = configureStore({
  reducer: {
    hotels: hotelsSlice,
  },
});
