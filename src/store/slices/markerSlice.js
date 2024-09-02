import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMarkerPosition: {},
  markerPositions: [],
};

export const markerSlice = createSlice({
  name: "marker",
  initialState,
  reducers: {
    setCurrentMarkerPosition: (state, action) => {
      state.currentMarkerPosition = action.payload;
    },
    addMarkerPosition: (state) => {
      state.markerPositions = [
        ...state.markerPositions,
        state.currentMarkerPosition,
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentMarkerPosition, addMarkerPosition } =
  markerSlice.actions;

export default markerSlice.reducer;
