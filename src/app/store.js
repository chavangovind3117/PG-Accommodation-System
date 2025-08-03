import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer, { saveStateMiddleware } from "../features/auth/authSlice";
import pgReducer from "../features/pg/pgSlice";
import bookingReducer from "../features/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    pg: pgReducer,
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveStateMiddleware),
});
