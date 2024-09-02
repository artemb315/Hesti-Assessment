import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIndex: -1,
  currentPolygon: [],
  polygons: [],
};

export const polygonSlice = createSlice({
  name: "polygon",
  initialState,
  reducers: {
    setSelectedPolygonIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    setCurrentPolygon: (state, action) => {
      state.currentPolygon = action.payload;
    },
    addPositionToCurrent: (state, action) => {
      state.currentPolygon = [...state.currentPolygon, action.payload];
    },
    addPolygon: (state) => {
      state.polygons = [...state.polygons, state.currentPolygon];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedPolygonIndex,
  setCurrentPolygon,
  addPositionToCurrent,
  addPolygon,
} = polygonSlice.actions;

export default polygonSlice.reducer;
