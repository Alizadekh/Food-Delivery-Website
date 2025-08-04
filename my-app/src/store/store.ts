import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import dealsReducer from "../features/dealsSlice";
import restaurantsReducer from "../features/restaurantSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deals: dealsReducer,
    restaurants: restaurantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
