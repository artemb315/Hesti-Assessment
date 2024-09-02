import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import markerReducer from "./slices/markerSlice";
import polygonReducer from "./slices/polygonSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    marker: markerReducer,
    polygon: polygonReducer,
  },
});
